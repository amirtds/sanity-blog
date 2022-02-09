import React, {useState, useEffect} from 'react';
import sanityClient from '../client';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import { Helmet } from 'react-helmet';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function OnePost(){
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0]{
          title,
          publishedAt,
          slug,
          body,
          seoTitle,
          seoDescription,
          ogTitle,
          ogDescription,
          "ogImage": ogImage.asset->url,
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
        }`,
        {slug: window.location.pathname.split('/')[1]}
      )
      .then(post => {
        setPost(post);
        setLoading(false);
      })
    }, []);

    return loading ? (
        <div>Loading...</div>
    ) : (
      <div>
        <Helmet>
          <title>{post.seoTitle}</title>
          <meta name="description" content={post.seoDescription} />
          <meta property='og:title' content={post.ogTitle} />
          <meta property='og:description' content={post.ogDescription} />
          <meta property='og:image' content={urlFor(post.ogImage).width(300).url()} />
        </Helmet>
        <div className="relative py-16 bg-white overflow-hidden">
            <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
              <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
                <svg
                  className="absolute top-12 left-full transform translate-x-32"
                  width={404}
                  height={384}
                  fill="none"
                  viewBox="0 0 404 384"
                >
                  <defs>
                    <pattern
                      id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
                </svg>
                <svg
                  className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
                  width={404}
                  height={384}
                  fill="none"
                  viewBox="0 0 404 384"
                >
                  <defs>
                    <pattern
                      id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
                </svg>
                <svg
                  className="absolute bottom-12 left-full transform translate-x-32"
                  width={404}
                  height={384}
                  fill="none"
                  viewBox="0 0 404 384"
                >
                  <defs>
                    <pattern
                      id="d3eb07ae-5182-43e6-857d-35c643af9034"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
                </svg>
              </div>
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8">
              <div className="text-lg max-w-prose mx-auto">
                <h1>
                  <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    {post.title}
                  </span>
                </h1>
                <hr className="mt-8 border-b-2 w-24 mx-auto border-gray-200" />
                <figure>
                  <img
                    className="w-full h-72 rounded-lg mt-12"
                    src={urlFor(post.mainImage).width(100).url()} 
                    alt={post.title}
                  />
                  <figcaption className='text-gray-700 text-center pt-2'>Sagittis scelerisque nulla cursus in enim consectetur quam.</figcaption>
                </figure>
                <p className="mt-8 text-xl text-gray-500 leading-8 prose prose-indigo">
                  <BlockContent 
                  blocks={post.body} 
                  projectId={sanityClient.clientConfig.projectId}
                  dataset={sanityClient.clientConfig.dataset}
                  />
                </p>
              </div>
            </div>
        </div>
      </div>
      )
}