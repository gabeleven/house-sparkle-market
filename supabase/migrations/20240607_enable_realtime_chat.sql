
-- Enable real-time for chat_messages table
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- Enable RLS on chat_messages table if not already enabled
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for chat_messages if they don't exist
DO $$
BEGIN
  -- Policy for users to view messages in conversations they're part of
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_messages' 
    AND policyname = 'Users can view messages in their conversations'
  ) THEN
    CREATE POLICY "Users can view messages in their conversations" 
      ON public.chat_messages 
      FOR SELECT 
      USING (
        EXISTS (
          SELECT 1 FROM public.conversations 
          WHERE conversations.id = chat_messages.conversation_id 
          AND (conversations.customer_id = auth.uid() OR conversations.cleaner_id = auth.uid())
        )
      );
  END IF;

  -- Policy for users to insert messages in conversations they're part of
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_messages' 
    AND policyname = 'Users can send messages in their conversations'
  ) THEN
    CREATE POLICY "Users can send messages in their conversations" 
      ON public.chat_messages 
      FOR INSERT 
      WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
          SELECT 1 FROM public.conversations 
          WHERE conversations.id = chat_messages.conversation_id 
          AND (conversations.customer_id = auth.uid() OR conversations.cleaner_id = auth.uid())
        )
      );
  END IF;

  -- Policy for users to update messages they sent
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_messages' 
    AND policyname = 'Users can update their own messages'
  ) THEN
    CREATE POLICY "Users can update their own messages" 
      ON public.chat_messages 
      FOR UPDATE 
      USING (auth.uid() = sender_id);
  END IF;
END $$;
