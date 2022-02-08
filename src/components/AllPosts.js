import React, { useState, useEffect } from 'react';
import sanityClient from "../client"
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      sanityClient.fetch(
        `*[_type == "post"] | order(publishedAt desc) {
          title,
          publishedAt,
          slug,
          body,
          "authorName": author->name,
          "authorImage": author->image,
          mainImage{
            asset->{
              _id,
              url
             }
           },
          categories {
            title,
            slug,
          },
        }`
        )
        .then(posts => {
          setPosts(posts);
          setLoading(false);
        })
    }, []);

    return loading ? (
        <div>Loading...</div>
      ) : ( 
        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {posts.map((post) => (
              <div key={post.slug.current} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <a href={`/${post.slug.current}` } className="block mt-2">
                    <div className="flex-shrink-0">
                    <img className="w-full object-cover" src={urlFor(post.mainImage).width(100).url()} alt={post.title} />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                    </div>
                    <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                            <span className="sr-only">{post.authorName}</span>
                            <img className="h-10 w-10 rounded-full" src={urlFor(post.authorImage).width(100).url()} alt={post.authorName} />
                        </div>
                        <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                            {post.authorName}
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                            <span aria-hidden="true">&middot;</span>
                        </div>
                        </div>
                    </div>
                    </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      );
}
