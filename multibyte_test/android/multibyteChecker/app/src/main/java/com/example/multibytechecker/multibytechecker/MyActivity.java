package com.example.multibytechecker.multibytechecker;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import java.net.URISyntaxException;


public class MyActivity extends Activity {
    private static final String TAG = MyActivity.class.getSimpleName();
    private TextView mTextLog;


    public static final String DEFUALT_SERVER_URL = "http://location.dev.d-p-s.jp";
    private Socket socket;

    private static final String ascii = "abcABC123!\"#";
    private static final String ascii2 = "abcABC123!#";
    private static final String multibyteCharactors = "あいうえお";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my);
        mTextLog = (TextView) findViewById(R.id.text_log);

        findViewById(R.id.button_ping1).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d(TAG, "emit ascii");
                socket.emit("ping", "android plain ascii", ascii);
                socket.emit("ping", "android json ascii", "{\"ascii\":\"" + ascii + "\"}");
                Log.d(TAG, "emit ascii2");
                socket.emit("ping", "android plain ascii2", ascii2);
                socket.emit("ping", "android json ascii2", "{\"ascii2\":\"" + ascii2 + "\"}");
                Log.d(TAG, "emit multibyteCharactors");
                socket.emit("ping", "android plain mutibyte charactor", multibyteCharactors);
                socket.emit("ping", "android json multibyte charactor", "{\"multibyteCharactors\":\"" + multibyteCharactors + "\"}");
            }
        });

        IO.Options opts = new IO.Options();
        Log.d(TAG, "opts.forceNew: " + opts.forceNew + ", opts.reconnection: " + opts.reconnection);
        opts.forceNew = true;
        opts.reconnection = false;

        try {
            socket = IO.socket(DEFUALT_SERVER_URL, opts);
            Log.d(TAG, "set on listeners...");
            socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    Log.d(TAG, "connected");
                }
            }).on("pong", new Emitter.Listener() {
                @Override
                public void call(final Object... args) {
                    try{
                        final String dump = "event: pong, test_type: " + args[0] + ", data: " + args[1];
                        Log.d(TAG, dump);
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                mTextLog.append(dump + "\n");
                            }
                        });
                    } catch (Exception e){
                        Log.e(TAG, e.getMessage(), e);
                    }
                }
            });
            Log.d(TAG, "try to connect...");
            socket.open();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

}
