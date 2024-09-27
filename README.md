# DevLinks - Link Sharing App

DevLinks is a responsive web application built with Next.js 14, allowing users to create and share customizable link collections. This project was developed as an assignment, replicating a provided Figma design with precision and incorporating modern web technologies.

## Technologies Used

- [Next.js 14](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Features

- Create and manage a collection of links
- Drag-and-drop functionality for reordering links
- Real-time preview of link collection
- Responsive design for all screen sizes
- Customizable UI components
- Various color schemes matching the prototype

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/devlinks.git
   cd devlinks
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install specific dependencies:
   ```
   npm install next@14 react react-dom
   npm install -D typescript @types/react @types/node
   npm install tailwindcss postcss autoprefixer
   npm install framer-motion
   ```

4. Install shadcn/ui components:
   ```
   npx shadcn-ui@latest init
   ```
   Follow the prompts to set up shadcn/ui in your project.

5. Install specific shadcn/ui components:
   ```
   npx shadcn-ui@latest add button
   npx shadcn-ui@latest add input
   npx shadcn-ui@latest add select
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Project Structure

The project follows the Next.js 14 App Router structure:

```
devlinks/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── select.tsx
│   └── ...
├── public/
│   └── assets/
├── styles/
│   └── globals.css
├── lib/
├── types/
└── ...
```

## Key Components

### Link Management
- Uses Framer Motion's `Reorder` component for drag-and-drop functionality
- Implements real-time updating of links in the preview SVG

### Preview
- SVG-based preview updates dynamically as links are added or modified
- Clickable links in the preview navigate to the entered URLs

### UI Components
- Utilizes customized shadcn/ui components (Button, Input, Select)
- Styling adjustments made to match the Figma prototype

### Responsive Design
- Implements responsive layouts for various screen sizes as specified in the prototype

## Customization

The project uses Tailwind CSS for styling. You can customize the appearance by modifying the `tailwind.config.js` file and the component styles.

## Assets

All assets provided in the Figma file have been incorporated into the project and can be found in the `public/assets/` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).