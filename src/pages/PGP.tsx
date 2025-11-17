import { Link } from "react-router-dom";
import { ArrowLeft, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PGP = () => {
  const { toast } = useToast();

  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEaQAhJxYJKwYBBAHaRw8BAQdAVpvlWcX4vpqG6XxNQD6UTiC1ho7MR1tiBisM
BSo0Pcy0P0thcnNoIChQdWJsaWMgRW5jcnlwdGlvbiBGcm9udCkgPHV0a2Fyc2hf
cmFuamFuQHByb3Rvbm1haWwuY29tPoiTBBMWCgA7FiEEz4scpC5SXyx32h6Ku8M3
CpGWFA8FAmkAIScCGwMFCwkIBwICIgIGFQoJCAsCBBYCAwECHgcCF4AACgkQu8M3
CpGWFA8i1gD/RpAZhmbUUtfYvhiTVmnZ03tJwZ4LohKd3KIsSHLwuxcA+wWPjHlt
jpYGtJjp85fjZzBPrziP4+06M7UMRsb4TagKuDgEaQAhJxIKKwYBBAGXVQEFAQEH
QLkP52n6CFjmhIPYiaezK6l/457GRtfjA/MTDqlfTvgDAwEIB4h4BBgWCgAgFiEE
z4scpC5SXyx32h6Ku8M3CpGWFA8FAmkAIScCGwwACgkQu8M3CpGWFA/cIAEAlO+E
KelX2ZLnzb2yrgfKbl3DJkUt5g2HI8WWzVy2wlABAICyACSTB9M6CfB/rVrgqSNi
9BGZagjYR02n1+zujB4M
=1uI5
-----END PGP PUBLIC KEY BLOCK-----
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pgpKey);
    toast({
      title: "Copied to clipboard",
      description: "PGP key has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen tech-grid">
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 p-6">
        <div className="max-w-4xl mx-auto py-12">
          <div className="mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-serif mb-4 glow-text">
              PGP Public Key
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              My public key for secure encrypted correspondence.
            </p>
          </div>

          <div className="card-elegant rounded-lg p-8 animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-serif">Public Key</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Key
              </Button>
            </div>
            <div className="bg-secondary/50 rounded-lg p-6 border border-border/50 overflow-x-auto">
              <pre className="font-mono text-sm text-foreground/90 whitespace-pre-wrap break-all">
                {pgpKey}
              </pre>
            </div>
          </div>

          <div className="mt-8 card-elegant rounded-lg p-6 animate-fade-in-up">
            <h3 className="text-lg font-serif mb-2">Key Information</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Email:</span>{" "}
                utkarsh_ranjan@protonmail.com
              </p>
              <p>
                <span className="font-medium text-foreground">Key Type:</span>{" "}
                ed25519
              </p>
              <p>
                <span className="font-medium text-foreground">Created:</span>{" "}
                2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGP;
