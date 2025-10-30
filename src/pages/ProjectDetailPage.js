import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { projectStatuses } from "@/lib/mockData";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Calendar,
  User,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";

export const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateProjectStage, language } = useApp();
  const t = useTranslation(language);

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Projeto não encontrado</p>
      </div>
    );
  }

  const currentStatus = projectStatuses.find((s) => s.id === project.status);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleAdvanceStage = (stageId) => {
    updateProjectStage(project.id, stageId, 100);
    toast.success("Etapa marcada como concluída!");
  };

  const stages = [
    { id: "venda", label: t("venda"), icon: "1️⃣" },
    { id: "fabricacao", label: t("fabricacao"), icon: "2️⃣" },
    { id: "instalacao", label: t("instalacao"), icon: "3️⃣" },
    { id: "pos-venda", label: t("pos-venda"), icon: "4️⃣" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/projects")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <Badge className={`${currentStatus.color} text-white`}>
              {t(project.status)}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">{project.id}</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("budget")}</p>
                <p className="text-lg font-bold">
                  {formatCurrency(project.budget)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("startDate")}
                </p>
                <p className="text-lg font-bold">
                  {new Date(project.startDate).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("endDate")}</p>
                <p className="text-lg font-bold">
                  {new Date(project.endDate).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("manager")}</p>
                <p className="text-lg font-bold line-clamp-1">
                  {project.manager}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Process Stages */}
      <Card>
        <CardHeader>
          <CardTitle>{t("processStages")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {stages.map((stage, index) => {
              const stageData = project.stages[stage.id];
              const isComplete = stageData.complete === 100;

              return (
                <div key={stage.id}>
                  <div className="flex items-start gap-4">
                    {/* Stage Icon */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                          isComplete
                            ? "bg-green-100 dark:bg-green-950/30"
                            : "bg-muted"
                        }`}
                      >
                        {isComplete ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        ) : (
                          stage.icon
                        )}
                      </div>
                    </div>

                    {/* Stage Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{stage.label}</h3>
                        <span className="text-sm font-medium">
                          {stageData.complete}%
                        </span>
                      </div>

                      <Progress
                        value={stageData.complete}
                        className="h-2 mb-3"
                      />

                      <p className="text-sm text-muted-foreground mb-3">
                        {stageData.notes}
                      </p>

                      {!isComplete && (
                        <Button
                          size="sm"
                          onClick={() => handleAdvanceStage(stage.id)}
                          className="mb-2"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          {t("markComplete")}
                        </Button>
                      )}
                    </div>
                  </div>

                  {index < stages.length - 1 && (
                    <div className="ml-6 my-4">
                      <div className="w-0.5 h-8 bg-border"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Attachments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {t("attachments")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {project.attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{attachment.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {attachment.size}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
