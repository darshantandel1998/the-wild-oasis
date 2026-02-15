import toast, { ToastBar, Toaster } from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 50%;
  transition: all 0.2s;
  cursor: pointer;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  &:hover {
    background-color: var(--color-grey-100);
  }
  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-500);
  }
`;

export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: { duration: 3000 },
        error: { duration: 5000 },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700)",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <Button onClick={() => toast.dismiss(t.id)}>
                  <HiXMark />
                </Button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
