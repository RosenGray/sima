---
name: professional-russian-translation
description: "Professional translation from Hebrew or English to Russian with cultural and contextual accuracy. Use this skill when the user asks to translate text, terms, or content to Russian, especially for: (1) Car models, brands, and automotive terminology, (2) Technical specifications and features, (3) Marketplace UI elements and content, (4) Any content requiring verification of actual Russian usage rather than literal translation. The skill researches proper Russian usage through official manufacturer sites, classified ads platforms, and automotive forums to ensure translations match real-world Russian terminology."
---

# Professional Russian Translation

## Overview

This skill provides professional, culturally-aware Russian translations that go beyond literal word-for-word conversion. It verifies actual Russian usage through web research, ensuring terminology matches how native speakers use terms in real-world contexts, particularly for automotive and marketplace content.

## Translation Workflow

Follow these steps for every translation request:

### 1. Initial Assessment

Determine the content type and context:
- **Simple words/phrases**: Common vocabulary that likely has standard translations
- **Brand names/models**: Require transliteration and verification
- **Technical terms**: May have established Russian equivalents
- **UI/marketplace text**: Needs natural, user-friendly Russian
- **Specialized terminology**: Requires research for proper usage

### 2. Check Reference Materials

Before translating, consult `references/terminology.md` for:
- Common automotive terminology patterns
- Brand transliteration standards
- Technical specification translations
- Marketplace UI element translations

This provides a foundation but should be verified for specific cases.

### 3. Research and Verify

For terms that require verification (brands, models, technical specs, or unfamiliar terms):

**Step 3a: Search Official Sources**
- Search manufacturer's Russian website (e.g., `site:toyota.ru Camry`)
- Look for official product pages, brochures, or specifications
- Note the exact Russian spelling and terminology used

**Step 3b: Verify in Real-World Usage**
- Search Russian classified ads sites: auto.ru, avito.ru, drom.ru
- Check how actual sellers and buyers use the term
- Confirm the terminology is consistent across multiple listings

**Step 3c: Cross-Reference (if needed)**
- Search automotive forums (drive2.ru, auto.mail.ru) for additional confirmation
- Look for discussions using the term in natural context

### 4. Translate

Apply the verified terminology:
- Use transliterations for brand names (e.g., "Toyota" → "Тойота")
- Keep model designations that are commonly used in Latin script (e.g., "X5", "GTI")
- Apply proper Russian grammar and sentence structure
- Ensure natural flow for Russian speakers

### 5. Quality Check

Before presenting the translation:
- **Verify terminology**: Quick search to confirm the Russian term is actually used
- **Check consistency**: Ensure similar terms are translated consistently
- **Consider alternatives**: Note if multiple valid translations exist
- **Explain choices**: If terminology differs from literal translation, briefly explain why

## Output Format

Present translations as:

```
Translation: [Russian text]
```

When research influenced the translation, add:

```
Translation: [Russian text]

Notes:
- [Brand/term]: Verified on [source] - commonly written as [Russian form]
- [Alternative if applicable]
```

## Common Scenarios

### Car Model Translation
User: "Translate 'Toyota Camry 2020' to Russian"
- Check references/terminology.md for Toyota transliteration
- Search `site:toyota.ru Camry` for official usage
- Verify on auto.ru to see real listings
- Result: "Тойота Камри 2020"

### Technical Specification
User: "Translate 'automatic transmission' to Russian"
- Check references/terminology.md
- Confirm on classified sites if unsure
- Result: "Автомат" or "АКПП" (both common)

### UI Element
User: "Translate 'Contact seller' to Russian"
- Check references/terminology.md for marketplace terms
- Result: "Связаться с продавцом"

### Mixed Content
User: "Translate 'BMW X5 with diesel engine for sale' to Russian"
- Transliterate "BMW" → "БМВ"
- Keep "X5" in Latin (standard practice)
- Translate "diesel engine" → "дизельный двигатель" or "дизель"
- Translate "for sale" → "продаётся"
- Result: "БМВ X5 с дизельным двигателем продаётся"

## Special Considerations

**Hebrew to Russian**: 
- Hebrew brand names should be transliterated to Russian based on the original brand's spelling, not the Hebrew transliteration
- Example: Hebrew "טויוטה" → First identify as "Toyota" → Then transliterate to Russian "Тойота"

**Context Matters**:
- "Truck" can be "Грузовик" (heavy truck) or "Пикап" (pickup truck)
- "SUV" can be "Внедорожник" (true off-roader) or "Кроссовер" (crossover)
- Choose based on the specific vehicle being described

**Regional Variations**:
- Some brands have multiple accepted transliterations (e.g., "Хёндэ" vs "Хендай" for Hyundai)
- Use the most common form found in official sources and major classified sites

## Resources

**Reference File**: `references/terminology.md`
- Common automotive terminology
- Brand transliterations
- Technical specifications
- Marketplace UI elements
- Search source recommendations