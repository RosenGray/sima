"use client";

import { FC, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconButton, Spinner } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ILastSearch } from "@/lib/last-search/models/LastSearch";
import { deleteLastSearch } from "@/lib/last-search/actions/lastSearch.actions";
import {
  SearchCardRow,
  SearchCardLink,
  SearchInfo,
  SearchTitle,
  SearchDate,
} from "../../last-searches.styles";

function formatDate(date: Date | undefined): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

interface LastSearchItemProps {
  search: ILastSearch;
}

const LastSearchItem: FC<LastSearchItemProps> = ({ search }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      const result = await deleteLastSearch(search.id);
      if (result.success) {
        router.refresh();
      }
    });
  };

  return (
    <SearchCardRow>
      <SearchCardLink href={search.url}>
        <Image
          src={search.thumbnail}
          alt={search.title}
          width={48}
          height={48}
          style={{ borderRadius: "var(--radius-2)", objectFit: "cover" }}
        />
        <SearchInfo>
          <SearchTitle as="span">{search.title}</SearchTitle>
          <SearchDate as="span">{formatDate(search.updatedAt)}</SearchDate>
        </SearchInfo>
      </SearchCardLink>
      <IconButton
        type="button"
        size="2"
        variant="ghost"
        color="gray"
        aria-label="Удалить"
        disabled={isPending}
        onClick={handleDelete}
        style={{ flexShrink: 0, cursor: "pointer" }}
      >
        {isPending ? (
          <Spinner size="1" />
        ) : (
          <Cross2Icon width="18" height="18" />
        )}
      </IconButton>
    </SearchCardRow>
  );
};

export default LastSearchItem;
