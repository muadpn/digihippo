"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEE = exports.PRODUCT_CATEGORIES = void 0;
exports.PRODUCT_CATEGORIES = [
    {
        label: "UI Kits",
        value: "ui_kits",
        featured: [
            {
                name: "Editor picks",
                href: "/products?category=ui_kits",
                ImageSrc: "/nav/ui-kits/mixed.jpg",
            },
            {
                name: "New Arrivals",
                href: "/products?category=ui_kits&sort=desc",
                ImageSrc: "/nav/ui-kits/blue.jpg",
            },
            {
                name: "Bestsellers",
                href: "/products?category=ui_kits",
                ImageSrc: "/nav/ui-kits/purple.jpg",
            },
        ],
    },
    {
        label: "Icons",
        value: "icons",
        featured: [
            {
                name: "Favorite Icon Picks",
                href: "/products?category=icons",
                ImageSrc: "/nav/icons/picks.jpg",
            },
            {
                name: "New Arrivals",
                href: "/products?category=icons&sort=desc",
                ImageSrc: "/nav/icons/new.jpg",
            },
            {
                name: "Bestselling Icons",
                href: "/products?category=icons",
                ImageSrc: "/nav/icons/bestsellers.jpg",
            },
        ],
    },
];
exports.FEE = 1;
