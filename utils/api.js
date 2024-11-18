const API_BASE_URL = 'http://localhost:3000/api';

// Fetch all categories.
export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);

    if (!response.ok) {
      throw new Error('Failed to fetch categories.');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Fetch all products.
export async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error('Failed to fetch products.');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Fetch a product by its ID.
export async function fetchProductsById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}.`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Add a new product.
export async function addProduct(productData) {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to create product.');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Update details for a product.
export async function updateProduct(id, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update product ${id}.`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Delete a product.
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete product ${id}.`);
    }
  } catch (error) {
    throw error;
  }
}
