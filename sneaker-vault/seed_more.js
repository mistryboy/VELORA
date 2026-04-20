import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUWDerP2qCBWhXNdE3d_ylHuIwEL3MAdw",
  authDomain: "velora-23287.firebaseapp.com",
  projectId: "velora-23287",
  storageBucket: "velora-23287.firebasestorage.app",
  messagingSenderId: "995212921787",
  appId: "1:995212921787:web:d0cbd94f4c2533f7ef929e",
  measurementId: "G-04SEMSH2DR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const newDrops = [
  {
    name: "PRISM RUNNER",
    category: "Running",
    style: "Holo-Tech",
    price: 310,
    rating: 4.9,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop",
    tag: "NEW",
    colors: ["#A855F7", "#F5F5F7"],
    sizes: [8, 9, 10, 11, 12],
    description: "Multi-dimensional speed. The Prism Runner adapts to your stride.",
    newRelease: true,
    inStock: true
  },
  {
    name: "SHADOW HIGH",
    category: "Lifestyle",
    style: "Midnight-Street",
    price: 295,
    rating: 4.8,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1998&auto=format&fit=crop",
    tag: "NEW",
    colors: ["#050505", "#F5F5F7"],
    sizes: [7, 8, 9, 10, 11],
    description: "Embrace the night. Premium materials for everyday stealth.",
    newRelease: true,
    inStock: true
  },
  {
    name: "OXYGEN X",
    category: "Training",
    style: "Breathable-Core",
    price: 185,
    rating: 4.6,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop",
    tag: "NEW",
    colors: ["#EF4444", "#F5F5F7"],
    sizes: [7, 7.5, 8, 8.5, 9, 10],
    description: "Lighter than air. The Oxygen X provides unmatched breathability and support.",
    newRelease: true,
    inStock: true
  }
];

async function seed() {
  console.log("Adding 3 new drops...");
  for (const product of newDrops) {
    product.createdAt = new Date().toISOString();
    product.hoverImage = product.image;
    
    await addDoc(collection(db, "products"), product);
    console.log("Imported " + product.name);
  }
  console.log("Database successfully seeded!");
  process.exit(0);
}

seed();
