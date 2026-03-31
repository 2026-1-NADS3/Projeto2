package com.example.appmayayamamoto;

import android.app.Dialog;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.slider.Slider;

public class ExercisesActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercises);


        View firstExerciseCard = findViewById(R.id.cvExerciseCard);

        View card1 = findViewById(R.id.ivExerciseBackground);
        if (card1 != null) {
            Button btnRegister = card1.findViewById(R.id.btnRegisterExecution);
            btnRegister.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    showRegisterDialog();
                }
            });
        }
    }

    private void showRegisterDialog() {
        final Dialog dialog = new Dialog(this);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.dialog_register_execution);


        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        }

        ImageView ivClose = dialog.findViewById(R.id.ivCloseDialog);
        Slider painSlider = dialog.findViewById(R.id.painSlider);
        TextView tvPainValue = dialog.findViewById(R.id.tvPainValue);
        Button btnConfirm = dialog.findViewById(R.id.btnConfirmExecution);


        painSlider.addOnChangeListener(new Slider.OnChangeListener() {
            @Override
            public void onValueChange(Slider slider, float value, boolean fromUser) {
                tvPainValue.setText(String.valueOf((int) value));
            }
        });

        ivClose.setOnClickListener(v -> dialog.dismiss());

        btnConfirm.setOnClickListener(v -> {
            Toast.makeText(ExercisesActivity.this, "Execução registrada com sucesso!", Toast.LENGTH_SHORT).show();
            dialog.dismiss();
        });

        dialog.show();
    }
}