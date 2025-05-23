import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Inductees from "@/pages/Inductees";
import PlayerProfile from "@/pages/PlayerProfile";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import EligibilityRules from "@/pages/EligibilityRules";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/inductees" component={Inductees} />
          <Route path="/player/:id" component={PlayerProfile} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/eligibility-rules" component={EligibilityRules} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
