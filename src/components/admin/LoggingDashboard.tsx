import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LogEntry, LoggingStats } from '@/types/logging';
import { logger } from '@/utils/logger';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const LoggingDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['logging-stats'],
    queryFn: () => logger.getStats(),
    refetchInterval: 30000 // Alle 30 Sekunden aktualisieren
  });

  const { data: recentLogs, isLoading: logsLoading } = useQuery({
    queryKey: ['recent-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as LogEntry[];
    },
    refetchInterval: 10000 // Alle 10 Sekunden aktualisieren
  });

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getLogBadgeColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  if (statsLoading || logsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Gesamt Logs</CardTitle>
            <CardDescription>Alle aufgezeichneten Ereignisse</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalLogs || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fehler</CardTitle>
            <CardDescription>Kritische Ereignisse</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{stats?.errorCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Warnungen</CardTitle>
            <CardDescription>Potenzielle Probleme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{stats?.warningCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Letzte Logs</CardTitle>
          <CardDescription>Die neuesten System-Ereignisse</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {recentLogs?.map((log) => (
                <Alert key={log.id} variant="default" className="border-l-4" style={{
                  borderLeftColor: log.level === 'error' ? 'rgb(239, 68, 68)' : 
                                 log.level === 'warning' ? 'rgb(234, 179, 8)' : 
                                 'rgb(59, 130, 246)'
                }}>
                  <div className="flex items-center gap-2">
                    {getLogIcon(log.level)}
                    <AlertTitle className="font-semibold">
                      {new Date(log.timestamp).toLocaleString()}
                    </AlertTitle>
                    <Badge className={`${getLogBadgeColor(log.level)} text-white`}>
                      {log.level.toUpperCase()}
                    </Badge>
                  </div>
                  <AlertDescription className="mt-2">
                    <div className="font-medium">{log.message}</div>
                    {log.metadata && (
                      <pre className="mt-2 text-sm bg-gray-100 p-2 rounded">
                        {JSON.stringify(log.metadata, null, 2)}
                      </pre>
                    )}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};