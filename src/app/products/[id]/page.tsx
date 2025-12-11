import { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import ProductDetailsClient, { ProductData } from '@/components/ProductDetailsClient';
import StructuredData from '@/components/StructuredData';
import { generateProductSchema } from '@/utils/seo';

async function getProducts(): Promise<ProductData[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'content', 'products.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = await JSON.parse(fileContent);
    return data.products || [];
  } catch (error) {
    console.error('Error reading products.json:', error);
    return [];
  }
}

async function getProduct(id: string): Promise<ProductData | null> {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const images = getProductImages(id as string);

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, string>>({});
  const [imageIndex, setImageIndex] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/content/products.json");
        if (!response.ok) throw new Error("Products file not found");

        const data = await response.json();
        const products = data.products || [];
        const foundProduct = products.find((p: ProductData) => p.id === id);

        if (!foundProduct) throw new Error("Product not found");

        const productData = {
          ...foundProduct,
          images: images.length > 0 ? images : foundProduct.images || [],
        };

        setProduct(productData);
      } catch (err) {
        setError("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleSection = (modelIndex: number, section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [modelIndex]: prev[modelIndex] === section ? "" : section,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Product not found
          </h2>
          <Link href="/products" className="text-primary hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const models =
    product.models && product.models.length > 0
      ? product.models
      : [
          {
            model: product.title,
            type: "",
            description: product.description,
            fullDescription: product.fullDescription,
            features: product.features,
            specifications: product.specifications,
            applications: product.applications,
            images: product.images,
          },
        ];

  const brochureLink = product.brochure || brochureMap[id as string];

  // Nitrogen benefits configuration
  const nitrogenBenefits = [
    { icon: <MileageIcon />, title: "More Mileage" },
    { icon: <TyreHeatIcon />, title: "Prevents Tyre Over Heat" },
    { icon: <MaintenanceIcon />, title: "Maintenance Repair" },
    { icon: <TyreLifeIcon />, title: "Increased Tyre Life" },
    { icon: <CleanIcon />, title: "100 % Dry and Clean" },
    { icon: <TyrePressureIcon />, title: "Consistent Tyre Pressure" },
  ];

  const isNitrogenProduct =
    id === "digital-nitrogen-tyre-inflator" || id === "nitrogen-generator";

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-background">
      {models.map((model, index) => {
        const currentImage = model.images?.[0] || model.image || product.images?.[0] || '/images/placeholder.svg';
        const features = model.features || product.features || [];
        const applications = model.applications || product.applications || [];
        const specifications = model.specifications || product.specifications || {};

        return (
          <section
            key={index}
            className="h-screen w-full snap-start flex flex-col pt-12 overflow-hidden relative"
          >
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row gap-8 lg:gap-12 py-4 lg:py-8">

              {/* Left Column: Image */}
              <div className="w-full lg:w-1/2 h-[40vh] lg:h-full flex items-center justify-center relative">
                <div className="relative w-full h-full max-h-[600px] lg:max-h-none bg-white rounded-[40px] p-8 shadow-sm flex items-center justify-center">
                  <Image
                    src={currentImage}
                    alt={model.model || product.title}
                    fill
                    className="object-contain p-4"
                    priority={index === 0}
                  />
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="w-full lg:w-1/2 h-full overflow-y-auto pr-2 custom-scrollbar pb-20">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                      {model.model}
                    </h2>
                    {model.type && (
                      <p className="text-base md:text-lg text-accent font-medium">{model.type}</p>
                    )}
                  </div>

                  <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
                    {model.fullDescription || model.description || product.fullDescription}
                  </p>

                  <div className="space-y-4">
                    {features.length > 0 && (
                      <AccordionItem
                        title="Key Features"
                        isOpen={openSections[index] === 'features'}
                        onClick={() => toggleSection(index, 'features')}
                      >
                        <ul className="space-y-3">
                          {features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-3 text-accent font-bold text-lg">•</span>
                              <span className="text-sm text-foreground/90">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionItem>
                    )}

                    {applications.length > 0 && (
                      <AccordionItem
                        title="Applications"
                        isOpen={openSections[index] === 'applications'}
                        onClick={() => toggleSection(index, 'applications')}
                      >
                        <ul className="space-y-3">
                          {applications.map((app, idx) => (
                            <li key={idx} className="flex items-center text-sm text-foreground/90">
                              <svg className="w-4 h-4 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              {app}
                            </li>
                          ))}
                        </ul>
                      </AccordionItem>
                    )}

                    {Object.keys(specifications).length > 0 && (
                      <AccordionItem
                        title="Technical Specifications"
                        isOpen={openSections[index] === 'specifications'}
                        onClick={() => toggleSection(index, 'specifications')}
                      >
                        <div className="space-y-2">
                          {Object.entries(specifications).map(([key, value]) => (
                            <div key={key} className="grid grid-cols-2 gap-4 py-3 border-b border-border/30 last:border-0">
                              <span className="font-semibold text-sm text-muted capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span className="text-sm text-foreground">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionItem>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      href={`/products/enquiry?product=${encodeURIComponent(model.model || product.title)}`}
                      className="flex-1 py-3 px-6 text-center bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Product Enquiry
                    </Link>

                    {brochureLink && (
                      <a
                        href={brochureLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-6 text-center border-2 border-primary text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Brochure
                      </a>
                    )}
                  </div>


                </div>
              </div>
            </div>

            {/* Scroll Indicator (only show if not last item) */}
            {index < models.length - 1 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-primary/50 hidden lg:block">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
