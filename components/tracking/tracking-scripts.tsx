import Script from "next/script";
import type { TrackingSettings } from "@/lib/content-schema";

export function TrackingScripts({ settings }: { settings: TrackingSettings }) {
  const gtmId = settings.gtmId.trim();
  const ga4Id = settings.ga4Id.trim();
  const googleAdsId = settings.googleAdsId.trim();
  const metaPixelId = settings.metaPixelId.trim();
  const clarityId = settings.clarityId.trim();
  const googleTagId = ga4Id || googleAdsId;

  return (
    <>
      <Script id="tracking-bootstrap" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];`}
      </Script>
      {gtmId ? (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`}
        </Script>
      ) : null}
      {googleTagId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`} strategy="afterInteractive" />
          <Script id="google-tag" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;gtag('js',new Date());${ga4Id ? `gtag('config',${JSON.stringify(ga4Id)},{send_page_view:false});` : ""}
${googleAdsId ? `gtag('config',${JSON.stringify(googleAdsId)});` : ""}`}
          </Script>
        </>
      ) : null}
      {metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init',${JSON.stringify(metaPixelId)});fbq('track','PageView');`}
        </Script>
      ) : null}
      {clarityId ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[])
.push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"
+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})
(window,document,"clarity","script",${JSON.stringify(clarityId)});`}
        </Script>
      ) : null}
    </>
  );
}
