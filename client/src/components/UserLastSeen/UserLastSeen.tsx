"use client";

import { FC } from "react";
import { Text } from "@radix-ui/themes";

export interface UserLastSeenProps {
  lastSeenAt: string | Date | null | undefined;
}

function formatLastSeenDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return [year, month, day].join("/");
}

const UserLastSeen: FC<UserLastSeenProps> = ({ lastSeenAt }) => {
  if (lastSeenAt == null || lastSeenAt === "") {
    return null;
  }

  const date = typeof lastSeenAt === "string" ? new Date(lastSeenAt) : lastSeenAt;
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const formatted = formatLastSeenDate(lastSeenAt);
  return (
    <Text size="2" color="gray">
      Последний вход в систему: {formatted}
    </Text>
  );
};

export default UserLastSeen;
