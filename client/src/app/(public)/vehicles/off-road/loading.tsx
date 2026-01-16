import {
  LoadingContainer,
  LoadingGrid,
  LoadingCard,
  CardImage,
  CardTitle,
  CardDescription,
  CardFooter,
  CardPrice,
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
              <CardPrice />
              <CardButton />
            </CardFooter>
          </LoadingCard>
        ))}
      </LoadingGrid>
    </LoadingContainer>
  );
}
