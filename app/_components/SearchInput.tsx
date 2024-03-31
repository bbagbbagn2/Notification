"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { IconSearch } from "@/public/svgs";

export default function SearchInput() {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  );
  const router = useRouter();

  const onSearch = (event: FormEvent) => {
    event.preventDefault();

    if (typeof searchQuery !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURI(searchQuery);

    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <form onSubmit={onSearch}>
      <SearchBox>
        <Input
          value={searchQuery || ""}
          onChange={(event: any) => setSearchQuery(event.target.value)}
          placeholder="검색어"
        />
        <button type="submit">
          <Image src={IconSearch} alt="Search" width={24} height={24} />
        </button>
      </SearchBox>
    </form>
  );
}

const SearchBox = styled.div`
  padding: 8px 12px;
  width: 280px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  border: 0.8px solid #dedede;
  border-radius: 6px;

  &:hover {
    border: 0.8px solid #222;
  }

  &:active {
    border: 0.8px solid #222;
  }
`;

const Input = styled.input`
  width: 100%;
  color: #222;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.08px;
  border: 0;

  &::placeholder {
    color: #cbcbcb;
  }

  &:focus {
    outline: none;
  }
`;
