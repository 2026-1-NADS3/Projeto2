package com.example.appmayayamamoto;

import android.content.Intent;
import android.content.res.ColorStateList;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

public class HomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);


        setupButtons();
    }

    private void setupButtons() {

        View vEx = findViewById(R.id.btnQuickExercises);
        if (vEx != null) {
            ((TextView) vEx.findViewById(R.id.tvActionText)).setText("Meus Exercícios");
            ((ImageView) vEx.findViewById(R.id.ivActionIcon)).setImageResource(R.drawable.ic_exercises_dumbbell);
            vEx.findViewById(R.id.vIconBackground).setBackgroundTintList(
                    ColorStateList.valueOf(ContextCompat.getColor(this, R.color.bg_exercises_soft_cyan)));
            ((ImageView) vEx.findViewById(R.id.ivActionIcon)).setImageTintList(
                    ColorStateList.valueOf(ContextCompat.getColor(this, R.color.icon_exercises_teal)));

            vEx.setOnClickListener(v -> startActivity(new Intent(this, ExercisesActivity.class)));
        }


        View vHis = findViewById(R.id.btnQuickHistory); // <-- ID corrigido
        if (vHis != null) {
            ((TextView) vHis.findViewById(R.id.tvActionText)).setText("Ver meu Histórico");
            ((ImageView) vHis.findViewById(R.id.ivActionIcon)).setImageResource(R.drawable.ic_history);
            vHis.findViewById(R.id.vIconBackground).setBackgroundTintList(
                    ColorStateList.valueOf(ContextCompat.getColor(this, R.color.bg_history_soft_pink)));
            ((ImageView) vHis.findViewById(R.id.ivActionIcon)).setImageTintList(
                    ColorStateList.valueOf(ContextCompat.getColor(this, R.color.icon_history_red)));

            vHis.setOnClickListener(v -> { /* sua ação aqui */ });
        }
    }
}