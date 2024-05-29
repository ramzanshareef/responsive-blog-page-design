"use server";

const data = [
    {
        "id": 1,
        "title": "Understanding React Hooks",
        "date": "2023-04-12",
        "author": "Jane Doe",
        "description": "A comprehensive guide to understanding and using React Hooks in your applications.",
        "thumbnail": "/assets/images/blog-1.jpg"
    },
    {
        "id": 2,
        "title": "Next.js vs. Gatsby",
        "date": "2023-05-08",
        "author": "John Smith",
        "description": "An in-depth comparison between Next.js and Gatsby for building static and dynamic websites.",
        "thumbnail": "/assets/images/blog-2.jpg"
    },
    {
        "id": 3,
        "title": "React Native vs. Flutter",
        "date": "2023-06-15",
        "author": "Alice Johnson",
        "description": "A detailed analysis of the pros and cons of React Native and Flutter for cross-platform mobile app development.",
        "thumbnail": "/assets/images/blog-3.jpg"
    },
    {
        "id": 4,
        "title": "GraphQL vs. REST",
        "date": "2023-07-20",
        "author": "Bob Brown",
        "description": "A comparison of GraphQL and REST APIs, including their use cases, benefits, and drawbacks.",
        "thumbnail": "/assets/images/blog-4.jpg"
    },
    {
        "id": 5,
        "title": "JAMstack Architecture",
        "date": "2023-08-25",
        "author": "Emily Wilson",
        "description": "An overview of JAMstack architecture and its benefits for building fast, secure, and scalable web applications.",
        "thumbnail": "/assets/images/blog-5.jpg"
    }
];

export async function getBlogPosts() {
    // In a real application, this data would be fetched from an API or database
    return data;
};