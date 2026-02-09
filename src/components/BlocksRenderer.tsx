"use client";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

const StrapiBlocks = ({ content }: { content: BlocksContent }) => {
    if (!content) return null;
    return <BlocksRenderer content={content} />;
};

export default StrapiBlocks;
