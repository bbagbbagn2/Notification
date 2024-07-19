'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { IconSearch } from '@/public/svgs';
import colors from '../_styles/theme';

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  const onSearch = (event: FormEvent) => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={onSearch}>
      <SearchBox>
        <Input
          value={searchQuery || ''}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(event.target.value)
          }
          placeholder="검색어"
        />
        <SearchButton type="submit">
          <Image src={IconSearch} alt="Search" width={20} height={20} color={colors.text} />
        </SearchButton>
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
  background-color: ${colors.bg200};
  border: 0.8px solid ${colors.bg200};
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;

  &:hover {
    border: 0.8px solid ${colors.bg300};
  }

  &:active {
    border: 0.8px solid ${colors.bg300};
  }
`;

const Input = styled.input`
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

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  border-radius: 100%;
  background-color: ${colors.white};
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;
