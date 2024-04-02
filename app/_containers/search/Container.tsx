"use client";

import InnerContainer from "../../_components/innerContainer";
import SearchHeader from "@/app/_containers/search/SearchHeader";
import PostContainer from "./PostContainer/Container";

export default function SearchContainer() {
  return (
    <InnerContainer>
      <SearchHeader />
      <PostContainer />
    </InnerContainer>
  );
}
