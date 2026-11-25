[ Next.js 16 Frontend (Vercel) ]
       │  (HTTPS + HttpOnly Cookie via Next.js BFF Route Handlers)
       ▼
[ NestJS API Server (Docker / VPS) ] ──► [ Redis (Cache + Rate Limit + BullMQ) ]
       │                                           │
       ├──► [ PostgreSQL (Prisma ORM) ]            ▼
       │                                 [ BullMQ Async Workers ]
       ├──► [ SSLCommerz / bKash API ]     ├─ provisioning.processor (Hypervisor / RDP)
       │         ▲ (IPN Webhook)           ├─ ip-swap.processor (CleanProxies / Pool)
       │         └─────────────────────────├─ email.processor (RDP Login & Invoices)
       └──► [ IPQS / Diagnostic APIs ]     └─ billing.processor (Renewal & Expiry)