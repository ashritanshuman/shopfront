import { useCallback } from 'react';

export const useCartAnimation = () => {
  const animateToCart = useCallback((imageUrl: string, startElement: HTMLElement) => {
    // Get cart icon position
    const cartIcon = document.getElementById('cart-icon');
    if (!cartIcon) return;

    const startRect = startElement.getBoundingClientRect();
    const endRect = cartIcon.getBoundingClientRect();

    // Calculate translation distances
    const deltaX = endRect.left - startRect.left;
    const deltaY = endRect.top - startRect.top;

    // Create flying image
    const flyingImage = document.createElement('img');
    flyingImage.src = imageUrl;
    flyingImage.className = 'cart-fly-animation';
    flyingImage.style.cssText = `
      left: ${startRect.left}px;
      top: ${startRect.top}px;
      width: ${startRect.width}px;
      height: ${startRect.height}px;
      --tx: ${deltaX}px;
      --ty: ${deltaY}px;
      object-fit: cover;
      border-radius: 0.5rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(flyingImage);

    // Add cart bounce animation
    cartIcon.classList.add('animate-bounce');
    setTimeout(() => {
      cartIcon.classList.remove('animate-bounce');
    }, 600);

    // Remove flying image after animation
    setTimeout(() => {
      flyingImage.remove();
    }, 800);
  }, []);

  return { animateToCart };
};
