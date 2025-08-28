import Link from "next/link";
import { Smartphone, Laptop, Headphones, Watch, Camera, Gamepad2 } from "lucide-react";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Smartphones",
      icon: Smartphone,
      description: "Latest mobile devices",
      count: "250+ products",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Laptops",
      icon: Laptop,
      description: "Powerful computing",
      count: "180+ products",
      color: "bg-purple-500",
    },
    {
      id: 3,
      name: "Audio",
      icon: Headphones,
      description: "Premium sound experience",
      count: "320+ products",
      color: "bg-green-500",
    },
    {
      id: 4,
      name: "Wearables",
      icon: Watch,
      description: "Smart accessories",
      count: "150+ products",
      color: "bg-orange-500",
    },
    {
      id: 5,
      name: "Cameras",
      icon: Camera,
      description: "Capture memories",
      count: "90+ products",
      color: "bg-red-500",
    },
    {
      id: 6,
      name: "Gaming",
      icon: Gamepad2,
      description: "Gaming gear",
      count: "200+ products",
      color: "bg-indigo-500",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of premium products across multiple categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={`/categories/${category.name.toLowerCase()}`}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <div className={`${category.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{category.description}</p>
                    <p className="text-xs text-blue-600 font-medium">{category.count}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
