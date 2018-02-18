# Prospekt

*Simple web application for quick prototyping of user interface.*

This application aims to help with defining **interface structure** from an end-user perspective and which **content elements** are placed on a specific page.


## Elements

This application consists of several modular elements.

### 1. Semantic CSS

Style sheets oriented towards semantic structure of HTML elements. Supports explanation tooltips for specific elements via `explain` attribute.


### 2. Capital M

Small library with shorthands and custom functions for faster development.


### 3. Router

Main script file which loads and renders specific template based on the URL location.


## Usage

1. Modify or write `index.html` file which loads all the necessary scripts
2. Write HTML templates which are then automatically loaded and rendered based on the route/location
    * Each HTML template consists of `template` tag and optional `script` and `style` tags
    * Additionally, each template can include partial templates with the usage of `<partial src="" />` element
3. Partial templates, e.g. header and footer, should be placed inside the `partials` folder
    * For example, if `partials/header.html` file should be included in the `templates/index.html` view, element `<partial src="header" />` should be added inside the `templates/index.html` root template element
4. Serve root project folder with any HTTP/S server


## Technical Constraints

This application is not intended for production usage. Therefore, it should work fine only in modern browsers which support latest CSS and ES features.


## Roadmap

- [Router] Navigation history
- [Router] Run optional script before first view is rendered


## License

Prospekt is released as open source software under the [GPL v3](https://opensource.org/licenses/gpl-3.0.html) license, see the [LICENSE](https://github.com/vjekoart/prospekt/blob/master/LICENSE) file in the project root for the full license text.
