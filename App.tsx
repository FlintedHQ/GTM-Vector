import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

// Money pages
import OutboundAutomation from "./pages/money/OutboundAutomation";
import ColdEmailDeliverability from "./pages/money/ColdEmailDeliverability";
import AiSdr from "./pages/money/AiSdr";
import OutboundInfrastructure from "./pages/money/OutboundInfrastructure";
import RevopsAutomation from "./pages/money/RevopsAutomation";

// Guides
import GuidesIndex from "./pages/guides/GuidesIndex";
import GuidesOutbound from "./pages/guides/GuidesOutbound";
import GuidesDeliverability from "./pages/guides/GuidesDeliverability";
import GuidesTooling from "./pages/guides/GuidesTooling";
import GuidesAutomation from "./pages/guides/GuidesAutomation";

// Compare
import CompareIndex from "./pages/compare/CompareIndex";
import CompareApolloVsClay from "./pages/compare/CompareApolloVsClay";
import CompareHubspotVsAttio from "./pages/compare/CompareHubspotVsAttio";
import CompareOutboundSalesAgencyVsInternalTeam from "./pages/compare/CompareOutboundSalesAgencyVsInternalTeam";

// Glossary
import GlossaryIndex from "./pages/glossary/GlossaryIndex";
import GlossarySPF from "./pages/glossary/GlossarySPF";
import GlossaryDKIM from "./pages/glossary/GlossaryDKIM";
import GlossaryDMARC from "./pages/glossary/GlossaryDMARC";
import GlossaryInboxPlacement from "./pages/glossary/GlossaryInboxPlacement";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Money pages */}
      <Route path="/outbound-automation" element={<OutboundAutomation />} />
      <Route path="/cold-email-deliverability" element={<ColdEmailDeliverability />} />
      <Route path="/ai-sdr" element={<AiSdr />} />
      <Route path="/outbound-infrastructure" element={<OutboundInfrastructure />} />
      <Route path="/revops-automation" element={<RevopsAutomation />} />

      {/* Guides */}
      <Route path="/guides" element={<GuidesIndex />} />
      <Route path="/guides/outbound" element={<GuidesOutbound />} />
      <Route path="/guides/deliverability" element={<GuidesDeliverability />} />
      <Route path="/guides/tooling" element={<GuidesTooling />} />
      <Route path="/guides/automation" element={<GuidesAutomation />} />

      {/* Compare */}
      <Route path="/compare" element={<CompareIndex />} />
      <Route path="/compare/apollo-vs-clay" element={<CompareApolloVsClay />} />
      <Route path="/compare/hubspot-vs-attio" element={<CompareHubspotVsAttio />} />
      <Route
        path="/compare/outbound-sales-agency-vs-internal-team"
        element={<CompareOutboundSalesAgencyVsInternalTeam />}
      />

      {/* Glossary */}
      <Route path="/glossary" element={<GlossaryIndex />} />
      <Route path="/glossary/spf" element={<GlossarySPF />} />
      <Route path="/glossary/dkim" element={<GlossaryDKIM />} />
      <Route path="/glossary/dmarc" element={<GlossaryDMARC />} />
      <Route path="/glossary/inbox-placement" element={<GlossaryInboxPlacement />} />

      {/* Fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
