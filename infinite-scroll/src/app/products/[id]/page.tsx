type Props = {
  params: { id: string };
};

export default async function ProductDetail({ params }: Props) {
  return <h2>{params.id}</h2>;
}
