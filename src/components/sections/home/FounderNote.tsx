import { Reveal } from "@/components/ui/reveal";
import { Clock, MessageCircle, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FounderNote() {
  return (
    <section className="section bg-white">
      <div className="shell grid items-center gap-10 lg:grid-cols-2">
        <Reveal className="relative order-2 h-72 overflow-hidden rounded-2xl sm:h-80 lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=75"
            alt="The primevpsbd support team in Dhaka"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={0.12}>
          <p className="eyebrow">Support</p>
          <h2 className="section-title mt-3">
            Real engineers, not a ticket queue
          </h2>
          <p className="lede max-w-md">
            Our team sits in Dhaka and works the same hours you do. Message us
            on WhatsApp and an engineer replies — usually within three minutes.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <Clock size={15} className="text-blue-600" />
              24/7 coverage
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle size={15} className="text-blue-600" />
              Bangla &amp; English
            </span>
            <span className="flex items-center gap-2">
              <PhoneCall size={15} className="text-blue-600" />
              +880 9606-PRIME
            </span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Talk to an engineer
            </Link>
            <Link href="/status" className="btn-outline">
              View live status
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
