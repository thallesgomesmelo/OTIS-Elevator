import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projectStatuses, projects as allProjects } from "@/lib/mockData";
import { MapPin, ArrowRight } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export const MapPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const t = useTranslation(language);
  const [selectedProject, setSelectedProject] = useState(null);

  const mapProjects = allProjects.slice(0, 15);

  const getStatusColor = (status) => {
    const statusConfig = projectStatuses.find((s) => s.id === status);
    return statusConfig?.color || "bg-gray-500";
  };

  const statusIcons = {
    venda: L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    fabricacao: L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    instalacao: L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    "pos-venda": L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold">{t("map")}</h1>
        <p className="text-muted-foreground mt-1">
          Localização dos projetos na América Latina
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-[600px] rounded-lg overflow-hidden">
                <MapContainer
                  center={[-15.8, -47.9]}
                  zoom={4}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {mapProjects.map((project) => (
                    <Marker
                      key={project.id}
                      position={[
                        project.coordinates.lat,
                        project.coordinates.lng,
                      ]}
                      icon={statusIcons[project.status]}
                      eventHandlers={{
                        click: () => setSelectedProject(project),
                      }}
                    >
                      <Popup>
                        <div className="text-sm font-semibold">
                          {project.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {project.city}, {project.countryName}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {selectedProject ? (
            <Card className="animate-fadeIn">
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{selectedProject.flag}</span>
                    <h3 className="font-bold text-lg line-clamp-2">
                      {selectedProject.name}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedProject.id}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Status:
                    </span>
                    <Badge
                      className={`${getStatusColor(
                        selectedProject.status
                      )} text-white`}
                    >
                      {t(selectedProject.status)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {t("progress")}:
                    </span>
                    <span className="font-medium">
                      {selectedProject.progress}%
                    </span>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${selectedProject.progress}%` }}
                    ></div>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-1">
                      {t("manager")}:
                    </p>
                    <p className="font-medium">{selectedProject.manager}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Localização:
                    </p>
                    <p className="font-medium">
                      {selectedProject.city}, {selectedProject.countryName}
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full group"
                  onClick={() => navigate(`/projects/${selectedProject.id}`)}
                >
                  {t("viewDetails")}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Clique em um marcador no mapa para ver os detalhes do projeto
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3">Legenda</h4>
              <div className="space-y-2">
                {projectStatuses.map((status) => (
                  <div key={status.id} className="flex items-center gap-2">
                    <MapPin
                      className={`w-5 h-5 text-${status.color}`}
                      fill="currentColor"
                    />
                    <span className="text-sm">{t(status.id)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
