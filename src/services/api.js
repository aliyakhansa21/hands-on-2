const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request(path) {
    if (!BASE_URL) {
        throw new Error(
        "NEXT_PUBLIC_API_URL is not defined. Please set it in .env.local"
        );
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        let message = `Request failed with status ${response.status}`;
        try {
        const errorBody = await response.json();
        if (errorBody?.message) message = errorBody.message;
        } catch (_) {
        }
        throw new Error(message);
    }

    const json = await response.json();
    return json;
}

function unwrap(json) {
    if (json && typeof json === "object" && "data" in json) {
        return json.data;
    }
    return json;
}

// normalizeProduct use to ensure that the product object has consistent fields and types
function normalizeProduct(raw) {
    if (!raw || typeof raw !== "object") return null;

    const id = raw.id;
    const name = raw.name ?? "Produk Tanpa Nama";
    const slug = raw.slug ?? null;
    const description = raw.description ?? "Belum ada deskripsi untuk produk ini.";
    const price = Number(raw.price ?? 0);
    const stock = Number(raw.stock ?? 0);
    const rating = Number(raw.rating ?? 0);
    const image = raw.imageUrl ?? null;
    const discountPercentage = Number(raw.discountPercentage ?? 0);
    const isFeatured = Boolean(raw.isFeatured);
    const isNewArrival = Boolean(raw.isNewArrival);
    const condition = raw.condition ?? "New";

    const finalPrice =
        discountPercentage > 0
        ? Math.round(price - (price * discountPercentage) / 100)
        : price;

    const category =
        (typeof raw.category === "string" ? raw.category : raw.category?.name) ??
        raw.categoryName ??
        "Uncategorized";
    const categoryId = raw.categoryId ?? raw.category?.id ?? null;

    const brand =
        (typeof raw.brand === "string" ? raw.brand : raw.brand?.name) ??
        raw.brandName ??
        null;
    const brandId = raw.brandId ?? raw.brand?.id ?? null;

    const storeId = raw.storeId ?? raw.store?.id ?? null;
    const storeName = raw.store?.name ?? raw.storeName ?? null;

    return {
        id,
        name,
        slug,
        description,
        price,
        finalPrice,
        discountPercentage,
        stock,
        rating,
        image,
        isFeatured,
        isNewArrival,
        condition,
        category,
        categoryId,
        brand,
        brandId,
        storeId,
        storeName,
        raw,
    };
}

// Normalizes a store object based on the confirmed GET /api/stores
function normalizeStore(raw) {
    if (!raw || typeof raw !== "object") return null;
    return {
        id: raw.id,
        name: raw.name ?? "Toko Tanpa Nama",
        slug: raw.slug ?? null,
        description: raw.description ?? "",
        city: raw.city ?? "-",
        rating: Number(raw.rating ?? 0),
        isOfficial: Boolean(raw.isOfficial),
        logo: raw.logoUrl ?? null,
        status: raw.status ?? "Active",
        productCount: Number(raw.productCount ?? 0),
        raw,
    };
}

// Normalizes a category object based on the confirmed GET /api/categories schema
function normalizeCategory(raw) {
    if (!raw || typeof raw !== "object") return null;
    return {
        id: raw.id,
        name: raw.name ?? "Tanpa Nama",
        slug: raw.slug ?? null,
        description: raw.description ?? "",
        productCount: Number(raw.productCount ?? 0),
        raw,
    };
}

// Normalizes a brand object based on the confirmed GET /api/brands schema
function normalizeBrand(raw) {
    if (!raw || typeof raw !== "object") return null;
    return {
        id: raw.id,
        name: raw.name ?? "Tanpa Nama",
        slug: raw.slug ?? null,
        description: raw.description ?? "",
        logo: raw.logoUrl ?? null,
        productCount: Number(raw.productCount ?? 0),
        raw,
    };
}

// Normalizes the stats object based on the confirmed GET /api/stats schema
function normalizeStats(raw) {
    if (!raw || typeof raw !== "object") return null;
    return {
        totalProducts: Number(raw.totalProducts ?? 0),
        totalStores: Number(raw.totalStores ?? 0),
        totalCategories: Number(raw.totalCategories ?? 0),
        totalBrands: Number(raw.totalBrands ?? 0),
        featuredProducts: Number(raw.featuredProducts ?? 0),
        newArrivalProducts: Number(raw.newArrivalProducts ?? 0),
        officialStores: Number(raw.officialStores ?? 0),
        lowStockProducts: Number(raw.lowStockProducts ?? 0),
        averageProductRating: Number(raw.averageProductRating ?? 0),
        averageStoreRating: Number(raw.averageStoreRating ?? 0),
        raw,
    };
}

export async function getProducts() {
    const json = await request("/api/products");
    const list = unwrap(json);
    if (!Array.isArray(list)) return [];
    return list.map(normalizeProduct).filter(Boolean);
}

export async function getProductById(id) {
    const json = await request(`/api/products/${id}`);
    const item = unwrap(json);
    return normalizeProduct(item);
}

export async function getStores() {
    const json = await request("/api/stores");
    const list = unwrap(json);
    if (!Array.isArray(list)) return [];
    return list.map(normalizeStore).filter(Boolean);
}

export async function getStoreById(id) {
    const json = await request(`/api/stores/${id}`);
    const item = unwrap(json);
    return normalizeStore(item);
}

export async function getProductsByStore(storeId) {
    const json = await request(`/api/stores/${storeId}/products`);
    const list = unwrap(json);
    if (!Array.isArray(list)) return [];
    return list.map(normalizeProduct).filter(Boolean);
}

export async function getCategories() {
    const json = await request("/api/categories");
    const list = unwrap(json);
    if (!Array.isArray(list)) return [];
    return list.map(normalizeCategory).filter(Boolean);
}

export async function getBrands() {
    const json = await request("/api/brands");
    const list = unwrap(json);
    if (!Array.isArray(list)) return [];
    return list.map(normalizeBrand).filter(Boolean);
}

export async function getStats() {
    const json = await request("/api/stats");
    const item = unwrap(json);
    return normalizeStats(item);
}