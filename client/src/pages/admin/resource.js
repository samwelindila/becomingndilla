import {
  FileText, Code2, Rocket, Briefcase, ShoppingBag, Quote, Image as ImageIcon,
} from "lucide-react";
import {
  posts, projects, ventures, services, products, testimonials, portfolio,
  postCategories, serviceCategories, portfolioCategories,
} from "../../data/content";

// One entry per content type managed in the dashboard.
//  key        - the URL part: /admin/<key>
//  path       - the API route (same as the public pages use)
//  titleKey   - field shown as the row title
//  subKey     - field shown under the title
//  template   - shape of a NEW record (existing records always use their real fields)
//  selects    - fields shown as a dropdown, with their options
export const resources = [
  {
    key: "posts",
    label: "Posts",
    singular: "post",
    icon: FileText,
    path: "/posts",
    titleKey: "title",
    subKey: "category",
    // Compare with your Post model: rename `content` here if your model uses another name.
    template: {
      title: "",
      type: "article",
      category: "",
      date: "",
      excerpt: "",
      cover: "",
      content: "",
      video: { kind: "", id: "" },
    },
    selects: {
      type: ["article", "video"],
      category: postCategories.filter((c) => c !== "All" && c !== "Videos"),
    },
  },
  {
    key: "projects",
    label: "Projects",
    singular: "project",
    icon: Code2,
    path: "/projects",
    titleKey: "title",
    subKey: "category",
    template: projects[0],
    selects: { status: ["Planning", "Building", "MVP", "In development", "Live"] },
  },
  {
    key: "ventures",
    label: "Ventures",
    singular: "venture",
    icon: Rocket,
    path: "/ventures",
    titleKey: "name",
    subKey: "type",
    template: ventures[0],
    selects: { status: ["Active", "Planned"] },
  },
  {
    key: "services",
    label: "Services",
    singular: "service",
    icon: Briefcase,
    path: "/services",
    titleKey: "title",
    subKey: "category",
    template: services[0],
    selects: { category: serviceCategories.filter((c) => c !== "All") },
  },
  {
    key: "products",
    label: "Products",
    singular: "product",
    icon: ShoppingBag,
    path: "/products",
    titleKey: "title",
    subKey: "type",
    template: products[0],
    selects: { type: ["Course", "E-book", "Product"] },
  },
  {
    key: "portfolio",
    label: "Portfolio",
    singular: "portfolio item",
    icon: ImageIcon,
    path: "/portfolio",
    titleKey: "title",
    subKey: "category",
    template: portfolio[0],
    selects: { category: portfolioCategories.filter((c) => c !== "All") },
  },
  {
    key: "testimonials",
    label: "Testimonials",
    singular: "testimonial",
    icon: Quote,
    path: "/testimonials",
    titleKey: "name",
    subKey: "role",
    template: testimonials[0],
    selects: {},
  },
];