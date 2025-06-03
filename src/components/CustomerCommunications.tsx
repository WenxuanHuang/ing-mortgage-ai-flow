
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Phone, Video, Send, Sparkles, Clock, CheckCircle } from 'lucide-react';

const CustomerCommunications = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('jan-vanbergen');
  const [message, setMessage] = useState('');

  const customers = [
    {
      id: 'jan-vanbergen',
      name: 'Jan van Bergen',
      email: 'jan.vanbergen@email.nl',
      applicationId: 'APP-2024-001',
      status: 'Active',
      lastContact: '2 hours ago',
      unreadMessages: 2,
      nextAction: 'Document review'
    },
    {
      id: 'maria-silva',
      name: 'Maria Silva',
      email: 'maria.silva@email.com',
      applicationId: 'APP-2024-002',
      status: 'Pending Response',
      lastContact: '1 day ago',
      unreadMessages: 0,
      nextAction: 'Income verification'
    },
    {
      id: 'thomas-mueller',
      name: 'Thomas Mueller',
      email: 'thomas.mueller@email.de',
      applicationId: 'APP-2024-003',
      status: 'Scheduled Call',
      lastContact: '3 hours ago',
      unreadMessages: 1,
      nextAction: 'Video consultation'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'customer',
      content: 'Hello, I wanted to check on the status of my mortgage application. When might I expect an update?',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'advisor',
      content: 'Good morning! Your application is progressing well. Our AI systems have completed the initial document review, and everything looks positive. I\'ll have a comprehensive update for you by tomorrow.',
      timestamp: '10:45 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'system',
      content: 'AI Assistant suggestion: Customer may benefit from information about the Fast Lane Track process.',
      timestamp: '10:46 AM',
      type: 'ai-suggestion'
    },
    {
      id: 4,
      sender: 'customer',
      content: 'That sounds great! What is the Fast Lane Track you mentioned?',
      timestamp: '11:15 AM',
      type: 'text'
    }
  ];

  const aiSuggestions = [
    {
      type: 'response',
      title: 'Suggested Response',
      content: 'The Fast Lane Track is our expedited processing service for qualifying applications. Based on your profile, you\'re eligible for this service which could reduce your approval time by up to 50%.'
    },
    {
      type: 'action',
      title: 'Recommended Next Step',
      content: 'Schedule a video consultation to discuss Fast Lane Track benefits and review final documentation requirements.'
    },
    {
      type: 'insight',
      title: 'Customer Insight',
      content: 'Customer shows high engagement and appears time-sensitive. Consider prioritizing this application for excellent customer experience.'
    }
  ];

  const currentCustomer = customers.find(c => c.id === selectedCustomer);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Communications</h2>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <Sparkles className="w-3 h-3 mr-1" />
          AI Assistant Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Customer List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Active Conversations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedCustomer === customer.id ? 'bg-orange-50 border-orange-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCustomer(customer.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{customer.name}</h4>
                  {customer.unreadMessages > 0 && (
                    <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                      {customer.unreadMessages}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600">{customer.applicationId}</p>
                <p className="text-xs text-gray-500">{customer.lastContact}</p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {customer.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Communication Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {currentCustomer?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{currentCustomer?.name}</h3>
                  <p className="text-sm text-gray-600">{currentCustomer?.applicationId}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="ai-assist">AI Assistant</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-4">
                {/* Message History */}
                <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${
                      msg.sender === 'advisor' ? 'justify-end' : 
                      msg.sender === 'system' ? 'justify-center' : 'justify-start'
                    }`}>
                      <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        msg.sender === 'advisor' ? 'bg-orange-500 text-white' :
                        msg.sender === 'system' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                        'bg-gray-100 text-gray-900'
                      }`}>
                        {msg.type === 'ai-suggestion' && (
                          <div className="flex items-center gap-1 mb-1">
                            <Sparkles className="w-3 h-3" />
                            <span className="text-xs font-medium">AI Assistant</span>
                          </div>
                        )}
                        <p>{msg.content}</p>
                        <p className="text-xs opacity-75 mt-1">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 min-h-[60px]"
                  />
                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Sparkles className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai-assist" className="space-y-4">
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-2">{suggestion.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{suggestion.content}</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Use Suggestion</Button>
                              <Button size="sm" variant="ghost">Dismiss</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Customer Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Customer Profile Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Communication Preference</span>
                      <span className="font-medium">Email + Chat</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Response Time Expectation</span>
                      <span className="font-medium">Within 4 hours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Engagement Level</span>
                      <span className="font-medium text-green-600">High</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next Best Action</span>
                      <span className="font-medium">Schedule consultation</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerCommunications;
