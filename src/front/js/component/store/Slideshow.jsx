import React from 'react';

const slides = [
    {
      imageUrl: "https://10web-site.ai/245/wp-content/uploads/sites/257/2025/01/tenweb_media_rFIGEugn.webp",
      heading: "Discover Exclusive Daycare Deals",
      description:
        "Explore our special offers on kids' apparel, backpacks, and school supplies. Enjoy great savings and quality products tailored for your child's needs.",
      buttonText: "Shop Deals",
      buttonLink: "/shop-all",
    },
    {
      imageUrl: "https://10web-site.ai/245/wp-content/uploads/sites/257/2025/01/tenweb_media_4o5KFd5Q.webp",
      heading: "Find Your Child's Perfect Fit",
      description:
        "Browse our extensive collection of kids' clothing and accessories. From trendy outfits to practical school gear, find everything your child needs.",
      buttonText: "Browse Collection",
      buttonLink: "/product-tag/kids-collection-needed-hound",
    },
    {
      imageUrl: "https://10web-site.ai/245/wp-content/uploads/sites/257/2025/01/tenweb_media_H5JDAWx8.webp",
      heading: "Enjoy Free Shipping on All Orders",
      description:
        "Take advantage of our free shipping offer on all purchases. Shop now and have your items delivered straight to your door at no extra cost.",
      buttonText: "Start Shopping",
      buttonLink: "/shipping-policy",
    },
  ]
  
  const Slideshow = () => {
    return (
      <div className="tw-relative tw-w-full tw-h-[80vh] tw-overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-transition-opacity tw-duration-1000 ${index === 0 ? "tw-opacity-100" : "tw-opacity-0"}`}
          >
            <img
              src={slide.imageUrl || "/placeholder.svg"}
              alt={slide.heading}
              className="tw-w-full tw-h-full tw-object-cover"
            />
            <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-black tw-bg-opacity-50 tw-flex tw-flex-col tw-justify-center tw-items-center">
              <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mb-4">{slide.heading}</h2>
              <p className="tw-text-lg tw-text-white tw-mb-8 tw-text-center tw-max-w-lg">{slide.description}</p>
              <a
                href={slide.buttonLink}
                className="tw-bg-blue-500 tw-hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-3 tw-px-6 tw-rounded"
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  export default Slideshow
  
  