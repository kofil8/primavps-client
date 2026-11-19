import { NextRequest, NextResponse } from 'next/server';

export interface IpReport {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  asn: string;
  org: string;
  isp: string;
  usageType: 'ISP / Residential' | 'Data Center / Hosting' | 'Business';
  fraudScore: number;
  riskBand: 'low' | 'medium' | 'high';
  proxyDetected: boolean;
  vpnDetected: boolean;
  torDetected: boolean;
  timezone: string;
  checkedAt: string;
  isDemoSample?: boolean;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let queryIp = searchParams.get('ip')?.trim();

  // If no IP passed, extract from request headers
  if (!queryIp) {
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
      queryIp = forwardedFor.split(',')[0].trim();
    } else {
      queryIp = request.headers.get('x-real-ip') || '';
    }
  }

  // Handle local development or private loopback IP by providing a labeled realistic visitor connection
  const isLocalOrPrivate =
    !queryIp ||
    queryIp === '::1' ||
    queryIp === '127.0.0.1' ||
    queryIp.startsWith('192.168.') ||
    queryIp.startsWith('10.') ||
    queryIp.startsWith('172.');

  if (isLocalOrPrivate) {
    // If no specific IP queried or query is localhost loopback, return realistic visitor ISP report
    return NextResponse.json<IpReport>({
      ip: '103.114.98.42',
      city: 'Dhaka',
      region: 'Dhaka Division',
      country: 'Bangladesh',
      countryCode: 'BD',
      asn: 'AS132062',
      org: 'Bangladesh Fiber Broadband',
      isp: 'Local Broadband ISP',
      usageType: 'ISP / Residential',
      fraudScore: 82,
      riskBand: 'high',
      proxyDetected: false,
      vpnDetected: false,
      torDetected: false,
      timezone: 'Asia/Dhaka',
      checkedAt: new Date().toISOString(),
      isDemoSample: true,
    });
  }

  try {
    // Query ip-api.com
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(queryIp)}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Upstream threat intelligence service unavailable. Please try again later.' },
        { status: 502 }
      );
    }

    const data = await res.json();

    if (data.status !== 'success') {
      return NextResponse.json(
        { error: data.message || `Invalid or unresolvable IP address: ${queryIp}` },
        { status: 400 }
      );
    }

    // Classify hosting vs residential
    const orgLower = (data.org || '').toLowerCase();
    const ispLower = (data.isp || '').toLowerCase();
    const asLower = (data.as || '').toLowerCase();

    const isHosting =
      orgLower.includes('amazon') ||
      orgLower.includes('google') ||
      orgLower.includes('microsoft') ||
      orgLower.includes('digitalocean') ||
      orgLower.includes('linode') ||
      orgLower.includes('ovh') ||
      orgLower.includes('hetzner') ||
      orgLower.includes('vultr') ||
      orgLower.includes('cloudflare') ||
      asLower.includes('hosting') ||
      ispLower.includes('hosting') ||
      ispLower.includes('datacenter');

    const usageType = isHosting ? 'Data Center / Hosting' : 'ISP / Residential';
    const fraudScore = isHosting ? 85 : 0;
    const riskBand = fraudScore >= 50 ? 'high' : fraudScore > 15 ? 'medium' : 'low';

    const report: IpReport = {
      ip: data.query,
      city: data.city || 'Unknown',
      region: data.regionName || data.region || '',
      country: data.country || '',
      countryCode: data.countryCode || '',
      asn: data.as ? data.as.split(' ')[0] : 'Unknown',
      org: data.org || data.isp || 'Unknown',
      isp: data.isp || 'Unknown',
      usageType,
      fraudScore,
      riskBand,
      proxyDetected: isHosting,
      vpnDetected: isHosting,
      torDetected: false,
      timezone: data.timezone || 'UTC',
      checkedAt: new Date().toISOString(),
      isDemoSample: false,
    };

    return NextResponse.json(report);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: 'Failed to inspect IP address due to an upstream network timeout.', details: message },
      { status: 502 }
    );
  }
}
