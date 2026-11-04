# AI Store Visibility

I want to build a modern B2B SaaS web application for a product called "ornitorank". 
Please design a clean, professional, and high-converting landing page built around the following core product idea and user workflow:

1. THE PROBLEM WE SOLVE:
E-commerce stores (Shopify, ikas, WooCommerce, etc.) are losing huge sales because AI search engines (like ChatGPT Shopping, Perplexity, and Google SGE) cannot find or recommend their products. 
Why? Because over 80% of stores have broken or incomplete variant microdata (Schema.org / JSON-LD) — missing GTIN barcodes, missing color/size attributes, and missing shipping details. When a user asks ChatGPT "recommend the best linen shirt under $100", AI engines skip these stores completely and recommend their competitors instead.

2. WHAT ORNITORANK DOES:
Ornitorank is an AI-Readiness and Catalog Optimization Engine. It crawls an e-commerce website, diagnoses all missing schema and variant data gaps, and automatically compiles a clean, validated 2-tab XLSX catalog fix and verified JSON-LD script that makes the entire catalog 100% visible and indexable by AI search engines and Google Merchant Center.

3. THE CORE INTERACTIVE USER JOURNEY (VERY IMPORTANT):
- The visitor lands on the page and sees a prominent input bar: "Enter your e-commerce store URL".
- The visitor inputs their URL (e.g. https://brand.com) and clicks "Analyze Store".
- The website runs a realistic, step-by-step diagnostic scan (scanning sitemap, checking Schema.org microdata, analyzing variant attributes, testing AI shopping visibility).
- RESULTS FIRST, PRICE AFTER: The visitor is immediately shown their store's actual diagnostic score (e.g., Health Score 48/100, 84% of variants invisible to AI, 3 critical schema errors).
- Only after seeing their real problems and the value we provide, the user is presented with the solution: A 2-tab clean catalog fix and 1-click schema script to fix all issues.

4. SECTIONS TO INCLUDE ON THE PAGE:
- Hero Section: Clear value proposition explaining how to make products visible on ChatGPT & Perplexity, featuring the live URL scanner input.
- Interactive Diagnostic Results Demo: Shows what an audit report looks like (score, critical gaps, missing variants).
- The Problem & Solution: A clear visual explanation of why traditional SEO doesn't work for AI shopping bots and how Ornitorank bridges the gap.
- Real Before vs After Comparison: Showing raw unindexed store code vs Ornitorank's clean, AI-ready verified product data.
- Pricing Section: 
  * Option 1: One-Time Complete Catalog Fix ($99) — full store audit + ready-to-import 2-tab Excel delivery.
  * Option 2: Continuous AI Sync ($149/month) — automated daily feed sync, new product schema generation, and continuous AI monitoring.
- Social Proof: Testimonials from e-commerce store owners and founders praising their traffic boost and Google Merchant approval.
- FAQ Section: Answering common questions (compatibility with Shopify/ikas, theme speed impact, turnaround time).

Please craft a beautiful, high-trust, responsive web application that clearly communicates this idea and feels like a fast, trustworthy venture-backed software product.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4936739f-1c74-45e7-951c-3bc643b7152f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
