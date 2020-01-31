# Prospekt

*Set of scripts for quick prototyping of web user interfaces.*

In the context of Prospekt, quick prototyping consists of:

* Defining **interface structure** from an end-user perspective, i.e. application screens.
* Defining **content elements** which are placed on a specific page, e.g. navigation, contact form and similar.


## Usage

For quick example:

1. Serve directory `examples/small-company-website` with HTTP server.
2. Open location in the web browser to see website prototype.
3. Browse through source code in that directory to see how Prospekt is used to create prototypes.

### Prototyping

1. Create main `index.html` which loads Prospekt files and has entry `<router></router>` element.
2. Create folder `partials` where components, e.g. navigation and header, are placed.
3. Create folder `templates` where application screens are placed.
    * Home screen should be named `index.html`.
    * Routes are defined by file names, e.g. file `about.html` will be rendered on the url `#/about` and can be accessed in HTML with `href="#/about"`.
    * Each HTML template consists of `template` tag and optional `script` and `style` tags.
    * Each template can include partial templates with the usage of `<partial src="" />` element.
    * For example, if `partials/header.html` file should be included in the `templates/index.html` view, element `<partial src="header" />` should be added inside the `templates/index.html` root template element.
4. Serve root project folder with any HTTP/S server.

### Technical Constraints

This application is not intended for production usage. Therefore, it should work fine in modern browsers which support latest CSS and ES features.


## Examples

All examples are located in the `examples` directory.

### Small Company Website

Standard small company website which consists of home, about and contact pages. Where each page has header and footer.


## Development

- Environment: Node.js v10.16, NPM 6.9.0
- Build Tool: Gulp

### Elements

Prospekt consists of several modular elements.

1. **Semantic CSS**
    * Style sheets oriented towards semantic structure of HTML elements.
    * Supports explanation tooltips for specific elements via `explain` attribute.
2. **Capital M**
    * Minimal JS library with shorthands for common functions and with custom functions for faster development.
3. **Router**
    * Hash-based router for web applications which loads and renders HTML templates based on the URL location.


## Roadmap

- [General] Add support for Prospekt configuration, e.g. location of `templates` and `partials` folders.
- [General] Build system with code linting and minification for JS and CSS files.
- [General] Unit tests for Capital M.
- [General] Unit tests for Router.
- [Docs] Documentation with examples for Capital M script.
- [Docs] Documentation with examples for Router script.
- [Docs] Documentation with examples for stylesheet.
- [Docs] Development documentation.
- [Router] Navigation history.
- [Router] Run optional script before first view is rendered.
- [General] Rewrite JS files in TypeScript.

---

Prospekt is released as open source software under the [GPL v3](https://opensource.org/licenses/gpl-3.0.html) license, see the [LICENSE](https://github.com/vjekoart/prospekt/blob/master/LICENSE) file in the project root for the full license text.
