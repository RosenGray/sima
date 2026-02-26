---
name: dom-scraper
description: Professional DOM scraping using browser MCP to extract content from web pages. Use this skill when the user asks to scrape, extract, or retrieve data from websites. Triggers include requests to "scrape [URL]", "extract data from [website]", "get content from [page]", "analyze [webpage]", or any request to retrieve information from a specific URL. Supports extracting visible text, HTML elements (headings, links, images, tables), structured data (articles, products, categories), and navigation elements. Outputs data in structured formats (JSON, Markdown) based on user needs.
---

# DOM Scraper

## Overview

This skill enables professional web scraping using browser MCP to extract content from any webpage. It supports extracting visible text, specific HTML elements, structured data, and navigation elements, with output in clean, structured formats.

## Workflow Decision Tree

1. **Understand the request** - Identify what needs to be extracted (full page, categories, specific elements, structured data)
2. **Navigate to the URL** - Use browser MCP to navigate to the target page
3. **Extract the content** - Use appropriate extraction method based on the request
4. **Format the output** - Structure the data in JSON or Markdown as appropriate
5. **Present results** - Return clean, relevant data matching the user's request

## Core Scraping Operations

### 1. Full Page Scraping

Extract all visible content from a webpage.

**When to use:** User requests "scrape this page", "get all content from [URL]", or similar broad requests.

**Process:**
- Navigate to URL using browser MCP
- Extract main content area (avoid headers, footers, ads, navigation)
- Capture headings, paragraphs, lists, and important elements
- Format in Markdown with hierarchy preserved

**Output format:** Markdown with proper heading levels

### 2. Category/Navigation Scraping

Extract navigation menus, category lists, or site structure.

**When to use:** User requests "scrape categories", "get the menu structure", "extract navigation links".

**Process:**
- Navigate to URL using browser MCP
- Identify navigation elements (nav, menu, category lists)
- Extract links with their text and URLs
- Organize hierarchically if nested categories exist

**Output format:** JSON with structure:
```json
{
  "categories": [
    {
      "name": "Category Name",
      "url": "https://example.com/category",
      "subcategories": [...]
    }
  ]
}
```

### 3. Structured Data Extraction

Extract specific types of content (articles, products, listings).

**When to use:** User requests "scrape all articles", "extract product listings", "get classified ads".

**Process:**
- Navigate to URL using browser MCP
- Identify repeating patterns (article cards, product tiles, listing items)
- Extract structured fields (title, description, price, image, link)
- Return as array of objects

**Output format:** JSON array:
```json
[
  {
    "title": "Item Title",
    "description": "Item description...",
    "url": "https://example.com/item",
    "image": "https://example.com/image.jpg",
    "price": "$100",
    "metadata": {...}
  }
]
```

### 4. Targeted Element Extraction

Extract specific elements by type or selector.

**When to use:** User requests "scrape all headings", "extract all images", "get table data".

**Process:**
- Navigate to URL using browser MCP
- Extract requested element type (headings, links, images, tables)
- Organize by element type and hierarchy

**Output formats:**
- **Headings:** Markdown hierarchy
- **Links:** JSON array with text and URLs
- **Images:** JSON array with src, alt, and dimensions
- **Tables:** Markdown tables or JSON arrays

## Browser MCP Integration

### Navigation
Use browser MCP to navigate to the target URL and wait for page load.

### Content Extraction
Use browser MCP's DOM access to:
- Query elements by selectors
- Extract text content
- Get attributes (href, src, class, id)
- Access computed styles if needed

### Handling Dynamic Content
- Wait for dynamic content to load
- Scroll if lazy-loading is detected
- Handle infinite scroll scenarios when needed

## Output Best Practices

### JSON Format
- Use clear, descriptive keys
- Include URLs as absolute paths
- Add metadata fields when relevant
- Maintain consistent structure across items

### Markdown Format
- Preserve heading hierarchy
- Use lists for navigation/categories
- Include links in reference format
- Keep formatting clean and readable

### Data Cleaning
- Remove extra whitespace
- Strip HTML entities
- Handle missing data gracefully
- Validate URLs before including

## Common Scraping Scenarios

### News/Blog Sites
Extract: articles, headlines, categories, authors, dates, images

### E-commerce/Classifieds
Extract: product/listing titles, prices, descriptions, images, categories, specifications

### Documentation Sites
Extract: navigation structure, article content, code examples, API references

### Social Media/Forums
Extract: posts, comments, user info, timestamps, engagement metrics

## Error Handling

- Handle navigation failures gracefully
- Report when pages require authentication
- Notify if content is behind JavaScript/dynamic loading
- Provide partial results if some elements fail to extract

## Resources

### references/scraping_patterns.md
Common DOM patterns and selectors for popular site types (news sites, e-commerce, classified ads, documentation).

### references/browser_mcp_guide.md
Detailed guide on using browser MCP tools for navigation and content extraction.