'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { IconSearch } from '@/public/svgs';
import colors from '../_styles/theme';

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    const query = searchQuery.trim();

    router.push(
      `/search/${query ? `?q=${encodeURIComponent(searchQuery)}` : ''}`,
    );

  
  };

  return (
    <form onSubmit={onSearch}>
      <SearchContainer>
        <SearchInputField
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="검색어"
        />
        <SearchIconButton type="submit">
          <Image
            src={IconSearch}
            alt="Search"
            width={20}
            height={20}
            color={colors.text}
          />
        </SearchIconButton>
      </SearchContainer>
    </form>
  );
}

const SearchContainer = styled.div`
  padding: 8px 12px;
  width: 280px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.bg200};
  border: 0.8px solid ${colors.bg200};
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;

  &:hover {
    border: 0.8px solid ${colors.bg300};
  }
`;

const SearchInputField = styled.input`
  width: 100%;
  color: ${colors.text};
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.08px;
  border: 0;
  background-color: transparent;

  &::placeholder {
    color: ${colors.text};
  }

  &:focus::placeholder {
    opacity: 0; // focus 상태에서 placeholder 숨기기
  }

  &:focus {
    outline: none;
  }
`;

const SearchIconButton = styled.button`
  border-radius: 100%;
  background-color: ${colors.white};
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;
