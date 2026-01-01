import PageLayout from "@/components/PageLayout";

const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEaVVx7hYJKwYBBAHaRw8BAQdAi23cEbMQD7pD8RnQm3EbaP69VfLfCXe7DGcM
H/t4oES0K0thcnNoIChQdWJsaWMgRW1haWwpIDxrYXJzaG1haWxAaWNsb3VkLmNv
bT6IkwQTFgoAOxYhBOEL52o5YdnDcm8m+6YntyYfgBPuBQJpVXHuAhsDBQsJCAcC
AiICBhUKCQgLAgQWAgMBAh4HAheAAAoJEKYntyYfgBPuj7YBAP2+tnHzZeOSaGRw
Zh5Is8FDuLOfZX8YZ+SLUwh5qCI+AQCnDSWUw4Le5d9kjSW+54kTums+jP240nQj
7HIXQ05tDbg4BGlVce4SCisGAQQBl1UBBQEBB0C33WKXpfdJii6VWky0QxhzqVRT
ZNzvsm105vjXfiFQTgMBCAeIeAQYFgoAIBYhBOEL52o5YdnDcm8m+6YntyYfgBPu
BQJpVXHuAhsMAAoJEKYntyYfgBPucgwA/1zq+KCUmFbK+6wkJD15y32XKG+0i0Rh
L8Fw/Sj+DX4WAQCig/1eqcDKjI6wCUlWarrPiR30mQg3R4pL1YrBaXz8Bw==
=zrdM
-----END PGP PUBLIC KEY BLOCK-----`;

const aboutMe = `Karsh
karshMail@icloud.com`;

const PGP = () => {
  return (
    <PageLayout title="PGP Key">
      <div className="space-y-6">
        <div className="border border-primary/20 p-4 bg-card/50 overflow-x-auto">
          <pre className="text-primary/70 text-xs font-mono whitespace-pre">
            {pgpKey}
          </pre>
        </div>

        <div className="border border-primary/20 p-4 bg-card/50 overflow-x-auto">
          <pre className="text-primary/70 text-xs font-mono whitespace-pre">
            {aboutMe}
          </pre>
        </div>
      </div>
    </PageLayout>
  );
};

export default PGP;
