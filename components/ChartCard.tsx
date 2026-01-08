import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function ChartCard({ title, children }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
