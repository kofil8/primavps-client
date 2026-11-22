import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement>;

export function BkashLogo({ className = "h-5 w-auto", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 92 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="bKash"
      className={className}
      {...props}
    >
      <g transform="translate(2, 2)">
        <path d="M12.4 13.1L2.2 2.2L15.1 4.9L12.4 13.1Z" fill="#E2136E" />
        <path d="M15.1 4.9L21.4 12.6L12.4 13.1L15.1 4.9Z" fill="#D11164" />
        <path d="M12.4 13.1L21.4 12.6L14.2 19.3L12.4 13.1Z" fill="#B80D57" />
        <path d="M12.4 13.1L14.2 19.3L8.8 23.2L12.4 13.1Z" fill="#9E0B4A" />
        <path d="M21.4 12.6L25.6 10.6L23.5 14.3L21.4 12.6Z" fill="#E2136E" />
        <path d="M19.8 9.2L23.8 8.3L21.4 12.6L19.8 9.2Z" fill="#C20E5C" />
      </g>
      <text
        x="32"
        y="19.5"
        fill="#E2136E"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="16"
        fontWeight="800"
        letterSpacing="-0.4"
      >
        bKash
      </text>
    </svg>
  );
}

export function NagadLogo({ className = "h-5 w-auto", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 92 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Nagad"
      className={className}
      {...props}
    >
      <g transform="translate(2, 2)">
        <circle cx="12" cy="12" r="11" fill="#F7941D" />
        <path
          d="M12 1C18.075 1 23 5.925 23 12C23 18.075 18.075 23 12 23C6.8 23 2.45 19.38 1.3 14.5C3.4 18.2 7.4 20.5 12 20.5C16.7 20.5 20.5 16.7 20.5 12C20.5 7.3 16.7 3.5 12 3.5C9.2 3.5 6.7 4.85 5.15 6.95C6.85 3.45 9.25 1 12 1Z"
          fill="#ED1C24"
        />
        <circle cx="12" cy="12" r="6.2" fill="#FFFFFF" />
        <path
          d="M10.2 15.2V8.8L14.8 15.2V8.8"
          stroke="#ED1C24"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <text
        x="31"
        y="19.5"
        fill="#EA3323"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="16"
        fontWeight="800"
        letterSpacing="-0.4"
      >
        Nagad
      </text>
    </svg>
  );
}

export function VisaLogo({ className = "h-5 w-auto", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 112 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Visa and Mastercard"
      className={className}
      {...props}
    >
      <text
        x="4"
        y="20"
        fill="#1A1F71"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="16.5"
        fontWeight="900"
        fontStyle="italic"
        letterSpacing="0.5"
      >
        VISA
      </text>
      <path d="M3 8.5H9.5L8.2 11.2L3 8.5Z" fill="#F7B600" />
      <line x1="60" y1="6" x2="60" y2="22" stroke="#CBD5E1" strokeWidth="1.2" />
      <circle cx="79" cy="14" r="8.5" fill="#EB001B" />
      <circle cx="91" cy="14" r="8.5" fill="#F79E1B" />
      <path
        d="M85 7.45A8.5 8.5 0 0 0 85 20.55A8.5 8.5 0 0 0 85 7.45Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

export function MastercardLogo({
  className = "h-5 w-auto",
  ...props
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 42 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mastercard"
      className={className}
      {...props}
    >
      <circle cx="15" cy="14" r="9.5" fill="#EB001B" />
      <circle cx="27" cy="14" r="9.5" fill="#F79E1B" />
      <path
        d="M21 6.5A9.5 9.5 0 0 0 21 21.5A9.5 9.5 0 0 0 21 6.5Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

export function VisaMastercardLogo(props: LogoProps) {
  return <VisaLogo {...props} />;
}

export function UsdtLogo({ className = "h-5 w-auto", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 88 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="USDT Tether"
      className={className}
      {...props}
    >
      <circle cx="14" cy="14" r="11" fill="#26A17B" />
      <path
        d="M9.5 9.2H18.5V11.3H15.2V13.1C17.6 13.25 19.4 13.75 19.4 14.35C19.4 14.95 17.6 15.45 15.2 15.6V19.6H12.8V15.6C10.4 15.45 8.6 14.95 8.6 14.35C8.6 13.75 10.4 13.25 12.8 13.1V11.3H9.5V9.2Z"
        fill="#FFFFFF"
      />
      <ellipse
        cx="14"
        cy="14.35"
        rx="5.2"
        ry="1.2"
        stroke="#26A17B"
        strokeWidth="0.9"
      />
      <text
        x="31"
        y="19.5"
        fill="#0F766E"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="15.5"
        fontWeight="800"
        letterSpacing="0.2"
      >
        USDT
      </text>
    </svg>
  );
}
