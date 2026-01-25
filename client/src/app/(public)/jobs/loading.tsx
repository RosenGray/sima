import {
  LoadingContainer,
  LoadingGrid,
  LoadingCard,
  CardImage,
  CardTitle,
  CardDescription,
  CardFooter,
  CardButton,
} from "./loading.styles";

export default function Loading() {
  return (
    <LoadingContainer>
      <LoadingGrid>
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingCard key={index}>
            <CardImage />
            <CardTitle />
            <CardDescription />
            <CardDescription />
            <CardDescription />
            <CardFooter>
              <CardButton />
            </CardFooter>
          </LoadingCard>
        ))}
      </LoadingGrid>
    </LoadingContainer>
  );
}
