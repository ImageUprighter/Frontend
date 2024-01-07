package com.image_slider; // Replace with your package name

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class PowerReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null && Intent.ACTION_POWER_CONNECTED.equals(intent.getAction())) {
            // Start your React Native activity or service here
            Intent launchIntent = new Intent(context, MainActivity.class); // Replace with your main activity
            launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(launchIntent);
        }
    }
}