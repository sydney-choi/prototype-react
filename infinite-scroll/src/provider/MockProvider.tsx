"use client";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function MockProvider({ children }: Props) {
  const [isMocking, setIsMocking] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        const { worker } = await import("@/mocks/browser");
        await worker.start({ onUnhandledRequest: "bypass" });
        setIsMocking(true);
      })();
    }
  }, []);

  // msw 초기화가 되지 않은 경우 자식 컴포넌트를 반환하지 않도록 함
  // 해당 설정을 하지 않고 바로 msw가 사용되는 페이지에 접근할 경우 msw 설정이 되기 전 API가 호출되어 mocking이 올바르게 수행되지 않음
  // 이 방식을 사용할 경우 발생될 수 있는 문제점은 msw 설정은 CSR로 동작되고 그 이후 컴포넌트들이 보이기 때문에 "SEO를 위해서는 적합한 방식이 아님"
  if (!isMocking) {
    return null;
  }

  return <>{children}</>;
}
