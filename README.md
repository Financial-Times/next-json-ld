# next-json-ld

Helpers for producing schema.org markup in JSON LD on ft.com

## Subscribe with Google (SwG) Markup

### Google Description
> SwG Markup associates a `productID`, which encompasses associated entitlements, with your content for authorization purposes.

> **Scenario**: You want to sell SwG subscriptions. To honor these subscriptions, the SwG client must be able to check a user’s entitlements with Google and match those entitlements to the current page in order to properly grant or bar access.

> **Scenario**: You want to indicate to Google what content is associated with an entitlement, so that a signed-in Google User, with the entitlement to access your content, sees the content more prominently in Google products.

> Markup your pages with a `productID` and publication name. This markup:
>
> * Globally identifies your publication to SwG
> * Indicates the entitlement required to access the content
> * Indicates whether or not this particular document requires entitlement
> * Helps swg.js check access to the content

> The markup is an extension of the existing Subscription and paywalled content markup, which you should be using to indicate restricted content to Google.  The markup must include publisher property.

> **Note**: A `productID` can be changed, but the new `productID` should be added to SKUs before changing the markup on the page. After a grace period to ensure full indexing, the deprecated `productID` can be removed from relevant SKUs.

### Our Implementation

Firstly it is important to understand that each piece of content has an `accessLevel` associated with it. The access levels / restrictions for **content** are `free`,`registered`,`subscribed`,`premium`.

These map nicely to Google's idea of **user** "entitlements". Whereby a **user** with an `ft.com:subscribed` entitlement would be allowed access to `subscribed` content and everything below (+ `registered` + `free`).

#### Our entitlements range productIDs/labels:

- **1 `ft.com:free`** (access to content with a `free` accessLevel)
- **2 `ft.com:registered`** (`registered` accessLevel content + `free`)
- **3 `ft.com:subscribed`** (`subscribed` accessLevel content + `registered` + `free`)
- **4 `ft.com:premium`** (`premium` accessLevel content + `subscribed` + `registered` + `free`)

For obvious reasons we only offer SKUs for purchase via Subscribe with Google that are either `ft.com:subscribed` (entitlements 1-3) and `ft.com:premium` (all entitlements).

**Note:** This works in conjunction with the existing `isAccessibleForFree` schema which indicates if content is accessible for free. In terms of access, the `isAccessibleForFree` property would trump any of the productIDs/labels.

#### Example markup on Article Page behind paywall (as seen by google bot)
Included in the JSON-LD (but not the snippet below) is a whole load of other meta data about the article.

```
{
	'@context': 'http://schema.org',
	'@type': 'NewsArticle',
	[...]
	'isAccessibleForFree': 'False',
	'isPartOf': {
		'@type': [ 'CreativeWork', 'Product' ],
		'name' : 'Financial Times',
		'productID': 'ft.com:subscribed' // or 'ft.com:premium' or 'ft.com:registered' depending on the requested content accessLevel
	}
}
```

#### Free Article page
SwG would automatically fetch all our SKUs on a free page (which is what you would want in the case of running a promotion).

```
{
	'@context': 'http://schema.org',
	'@type': 'NewsArticle',
	[...]
	'isAccessibleForFree': 'True',
	'isPartOf': {
		'@type': [ 'CreativeWork', 'Product' ],
		'name' : 'Financial Times',
		'productID': 'ft.com:free'
	}
}
```

#### Content Barrier/Paywall
Content barriers populate the `isPartOf` markup with data pertaining to the requested content. Unlike actual article pages it does not include the additional article meta data.

```
{
	'@context': 'http://schema.org',
	'isAccessibleForFree': 'False',
	'isPartOf': {
		'@type': [ 'CreativeWork', 'Product' ],
		'name' : 'Financial Times',
		'productID': 'ft.com:subscribed' // or 'ft.com:premium' or 'ft.com:registered' depending on the requested content accessLevel
	}
}
```

#### Standalone paywall (aka Product Selector)
For the product selector the SwG client is manually invoked passing in the relevant config, therefore the markup is not required on barriers.
