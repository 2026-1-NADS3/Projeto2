package com.example.appmayayamamoto;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {


    private Button btnEnter;
    private TextView tvSignUpLink;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        setContentView(R.layout.activity_login);


        btnEnter = findViewById(R.id.btnEnter);
        tvSignUpLink = findViewById(R.id.tvSignUpLink);


        btnEnter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(MainActivity.this, HomeActivity.class);
                startActivity(intent);


                overridePendingTransition(R.anim.enter_from_right, R.anim.exit_to_left);


                finish();
            }
        });


        tvSignUpLink.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this, "Tela de cadastro em breve!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}