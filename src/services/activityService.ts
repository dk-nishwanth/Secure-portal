// Activity Service - Ready for backend integration
// This service handles all API calls related to activity logging and audit trails

interface ActivityApiResponse {
  success: boolean;
  data: {
    period: {
      days: number;
      startDate: string;
      endDate: string;
    };
    totalActions: number;
    failedActions: number;
    actionsByType: Array<{
      _id: string;
      count: number;
    }>;
    topUsers: Array<{
      _id: string;
      count: number;
      userId: string;
      name: string;
      email: string;
    }>;
    recentCriticalActions: Array<{
      _id: string;
      userId: {
        _id: string;
        name: string;
        email: string;
      };
      resourceId: string;
      resourceType: string;
      action: string;
      details: any;
      ipAddress: string;
      userAgent: string;
      status: string;
      timestamp: string;
    }>;
  };
  message: string;
  error: null | string;
}

interface ExportOptions {
  days: number;
  format: 'csv' | 'json' | 'xlsx';
  filters?: {
    action?: string;
    userId?: string;
    status?: string;
  };
}

class ActivityService {
  private baseUrl: string;
  private getAuthToken: () => string | null;

  constructor() {
    // TODO: Set from environment variables
    this.baseUrl = process.env.REACT_APP_API_BASE_URL || '/api';
    this.getAuthToken = () => 
      localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAuthToken();
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  /**
   * Fetch activity statistics and recent actions
   * @param days Number of days to fetch data for (7, 30, 90)
   * @returns Promise<ActivityApiResponse>
   */
  async getActivityStatistics(days: number = 30): Promise<ActivityApiResponse> {
    return this.makeRequest<ActivityApiResponse>(`/audit/statistics?days=${days}`);
  }

  /**
   * Export activity data in specified format
   * @param options Export configuration
   * @returns Promise<Blob> for file download
   */
  async exportActivityData(options: ExportOptions): Promise<Blob> {
    const params = new URLSearchParams({
      days: options.days.toString(),
      format: options.format,
    });

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const token = this.getAuthToken();
    const response = await fetch(`${this.baseUrl}/audit/export?${params}`, {
      method: 'GET',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Export failed! status: ${response.status}`);
    }

    return response.blob();
  }

  /**
   * Get detailed information about a specific activity
   * @param activityId The ID of the activity
   * @returns Promise with activity details
   */
  async getActivityDetails(activityId: string): Promise<any> {
    return this.makeRequest(`/audit/activity/${activityId}`);
  }

  /**
   * Search activities with advanced filters
   * @param query Search parameters
   * @returns Promise<ActivityApiResponse>
   */
  async searchActivities(query: {
    search?: string;
    action?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<ActivityApiResponse> {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });

    return this.makeRequest<ActivityApiResponse>(`/audit/search?${params}`);
  }

  /**
   * Get real-time activity updates (WebSocket connection)
   * @param onUpdate Callback function for new activities
   * @returns WebSocket connection
   */
  connectToActivityStream(onUpdate: (activity: any) => void): WebSocket | null {
    try {
      const token = this.getAuthToken();
      const wsUrl = `${this.baseUrl.replace('http', 'ws')}/audit/stream?token=${token}`;
      
      const ws = new WebSocket(wsUrl);
      
      ws.onmessage = (event) => {
        try {
          const activity = JSON.parse(event.data);
          onUpdate(activity);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return ws;
    } catch (error) {
      console.error('Failed to connect to activity stream:', error);
      return null;
    }
  }
}

// Export singleton instance
export const activityService = new ActivityService();
export type { ActivityApiResponse, ExportOptions };