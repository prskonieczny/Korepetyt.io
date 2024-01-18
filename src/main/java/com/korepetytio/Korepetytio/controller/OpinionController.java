package com.korepetytio.Korepetytio.controller;

import com.korepetytio.Korepetytio.dto.request.AddOpinionRequest;
import com.korepetytio.Korepetytio.dto.response.ShowOpinionResponse;
import com.korepetytio.Korepetytio.service.interfaces.OpinionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/opinion")
public class OpinionController {
    private final OpinionService opinionService;
    public OpinionController(OpinionService opinionService) {
        this.opinionService = opinionService;
    }

    @GetMapping("/teacher/{teacherUsername}")
    public ResponseEntity<List<ShowOpinionResponse>> getAllOpinionsForTeacher(@PathVariable String teacherUsername) {
        List<ShowOpinionResponse> opinions = opinionService.getAllOpinionsForTeacher(teacherUsername);
        return ResponseEntity.ok(opinions);
    }
    @GetMapping("/self")
    public ResponseEntity<List<ShowOpinionResponse>> getOpinionsByStudent() {
        try {
            List<ShowOpinionResponse> opinions = opinionService.getOwnOpinions();
            return ResponseEntity.ok(opinions);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
    }
    @PostMapping("/add")
    public ResponseEntity<String> addOpinion(@RequestBody AddOpinionRequest addOpinionRequest) {
        try {
            opinionService.addOpinion(addOpinionRequest);
            return ResponseEntity.ok("Opinion added successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add opinion: " + e.getMessage());
        }
    }
    @DeleteMapping("/{opinionId}")
    public ResponseEntity<String> deleteOpinion(@PathVariable Long opinionId) {
        try {
            opinionService.deleteOpinion(opinionId);
            return ResponseEntity.ok("Opinion deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete opinion: " + e.getMessage());
        }
    }
}
